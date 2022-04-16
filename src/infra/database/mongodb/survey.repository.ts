import { AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository, Survey, AddSurveyModel } from '@/data/protocols'
import { ObjectId } from 'mongodb'
import { MongoHelper, QueryBuilder } from '.'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (addSurveyParams: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    return surveyCollection.insertOne(addSurveyParams)
      .then(result => MongoHelper.map(result, addSurveyParams))
  }

  async findAll (accountId: string): Promise<Survey[]> {
    const surveyCollection = await MongoHelper.getCollection<Survey>('surveys')

    const query = new QueryBuilder()
      .lookup({
        from: 'survey-results',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', new ObjectId(accountId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()

    return surveyCollection.aggregate(query)
      .map(survey => MongoHelper.mapResult<Survey>(survey))
      .toArray()
  }

  async loadById (id: string): Promise<Survey> {
    const surveyCollection = await MongoHelper.getCollection<Survey>('surveys')

    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.mapResult(survey)
  }
}
