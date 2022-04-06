import { LoadSurveysRepository } from '../../../../data/protocols/database/survey/load-surveys-repository'
import { AddSurveyModel, AddSurveyRepository, SurveyModel } from '../../../../data/usecases/add-survey/db-add-survey.protocol'
import { MongoHelper } from '../helpers/mongo.helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (addSurveyModel: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    return surveyCollection.insertOne(addSurveyModel)
      .then(result => MongoHelper.map(result, addSurveyModel))
  }

  async findAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection<SurveyModel>('surveys')

    return surveyCollection.find()
      .map(survey => MongoHelper.mapResult<SurveyModel>(survey))
      .toArray()
  }
}
