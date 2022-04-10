import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'
import { MongoHelper } from '../helpers/mongo.helper'

export class SurveyResultMongoRepository implements SaveSurveyResult {
  async save (SaveSurveyResultParams: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('survey-results')

    return surveyResultCollection.findOneAndUpdate(
      {
        surveyId: SaveSurveyResultParams.surveyId,
        accountId: SaveSurveyResultParams.accountId
      },
      {
        $set: {
          answer: SaveSurveyResultParams.answer,
          date: SaveSurveyResultParams.date
        }
      },
      { upsert: true, returnDocument: 'after' }
    ).then(result => MongoHelper.mapResult(result.value))
  }
}
