import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey.protocol'
import { MongoHelper } from '../helpers/mongo.helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (addSurveyModel: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    return surveyCollection.insertOne(addSurveyModel)
      .then(result => MongoHelper.map(result, addSurveyModel))
  }
}
