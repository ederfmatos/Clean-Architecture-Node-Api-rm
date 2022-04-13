import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo.helper'

export class SurveyResultMongoRepository implements SaveSurveyResult {
  async save (saveSurveyResultParams: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('survey-results')

    await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: new ObjectId(saveSurveyResultParams.surveyId),
        accountId: new ObjectId(saveSurveyResultParams.accountId)
      },
      {
        $set: {
          answer: saveSurveyResultParams.answer,
          date: saveSurveyResultParams.date
        }
      },
      { upsert: true }
    ).then(console.log)

    return this.loadBySurveyId(saveSurveyResultParams.surveyId)
  }

  private async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('survey-results')

    const query = surveyResultCollection.aggregate([
      {
        $match: {
          surveyId: new ObjectId(surveyId)
        }
      },
      {
        $group: {
          _id: 0,
          data: {
            $push: '$$ROOT'
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $unwind: {
          path: '$data'
        }
      },
      {
        $lookup: {
          from: 'surveys',
          foreignField: '_id',
          localField: 'data.surveyId',
          as: 'survey'
        }
      },
      {
        $unwind: {
          path: '$survey'
        }
      },
      {
        $group: {
          _id: {
            surveyId: '$survey._id',
            question: '$survey.question',
            date: '$survey.date',
            total: '$count',
            answer: {
              $filter: {
                input: '$survey.answers',
                as: 'item',
                cond: {
                  $eq: ['$$item.answer', '$data.answer']
                }
              }
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $unwind: {
          path: '$_id.answer'
        }
      },
      {
        $addFields: {
          '_id.answer.count': '$count',
          '_id.answer.percent': {
            $multiply: [{
              $divide: ['$count', '$_id.total']
            }, 100]
          }
        }
      },
      {
        $group: {
          _id: {
            surveyId: '$_id.surveyId',
            question: '$_id.question',
            date: '$_id.date'
          },
          answers: { $push: '$_id.answer' }
        }
      },
      {
        $project: {
          _id: 0,
          surveyId: '$_id.surveyId',
          question: '$_id.question',
          date: '$_id.date',
          answers: '$answers'
        }
      }
    ])
    const surveyResult = await query.toArray()
    return surveyResult[0] as SurveyResultModel
  }
}
