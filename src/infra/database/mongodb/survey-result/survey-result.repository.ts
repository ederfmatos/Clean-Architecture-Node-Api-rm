import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResult, SaveSurveyResultModel } from '@/domain/usecases/account/save-survey-result.usecase'
import { MongoHelper } from '../helpers/mongo.helper'

export class SurveyResultMongoRepository implements SaveSurveyResult {
  async save (saveSurveyResultModel: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('survey-results')

    return surveyResultCollection.findOneAndUpdate(
      {
        surveyId: saveSurveyResultModel.surveyId,
        accountId: saveSurveyResultModel.accountId
      },
      {
        $set: {
          answer: saveSurveyResultModel.answer,
          date: saveSurveyResultModel.date
        }
      },
      { upsert: true, returnDocument: 'after' }
    ).then(result => MongoHelper.mapResult(result.value))
  }
}
