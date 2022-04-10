import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id.usecase'
import { LoadSurveysRepository } from '@/data/protocols/database/survey/load-surveys-repository'
import { AddSurveyParams, AddSurveyRepository, SurveyModel } from '@/data/usecases/survey/add-survey/db-add-survey.protocol'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add (AddSurveyParams: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    return surveyCollection.insertOne(AddSurveyParams)
      .then(result => MongoHelper.map(result, AddSurveyParams))
  }

  async findAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection<SurveyModel>('surveys')

    return surveyCollection.find()
      .map(survey => MongoHelper.mapResult<SurveyModel>(survey))
      .toArray()
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection<SurveyModel>('surveys')

    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.mapResult(survey)
  }
}
