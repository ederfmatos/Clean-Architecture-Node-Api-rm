import { AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository, ExistsSurveyByIdRepository, LoadAnswersBySurveyRepository } from '@/data/protocols'
import { MongoHelper, QueryBuilder } from '.'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository, ExistsSurveyByIdRepository, LoadAnswersBySurveyRepository {
  async add (addSurveyParams: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    return surveyCollection.insertOne(addSurveyParams)
      .then(result => MongoHelper.map(result, addSurveyParams))
  }

  async findAll (accountId: string): Promise<LoadSurveysRepository.Response[]> {
    const surveyCollection = await MongoHelper.getCollection<LoadSurveysRepository.Response>('surveys')

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
                cond: { $eq: ['$$item.accountId', new ObjectId(accountId)] }
              }
            }
          }, 1]
        }
      })
      .build()

    return surveyCollection.aggregate(query)
      .map(survey => MongoHelper.mapResult<LoadSurveysRepository.Response>(survey))
      .toArray()
  }

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Response> {
    const surveyCollection = await MongoHelper.getCollection<LoadSurveyByIdRepository.Response>('surveys')

    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.mapResult(survey)
  }

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Response> {
    const surveyCollection = await MongoHelper.getCollection<LoadSurveyByIdRepository.Response>('surveys')

    const query = new QueryBuilder()
      .match({ _id: new ObjectId(id) })
      .project({ _id: 0, answers: '$answers.answer' })
      .build()

    const survey = await surveyCollection.aggregate(query).tryNext()
    return survey?.answers
  }

  async existsById (id: string): Promise<ExistsSurveyByIdRepository.Response> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    const survey = await surveyCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 1 } }
    )
    return survey !== null
  }
}
