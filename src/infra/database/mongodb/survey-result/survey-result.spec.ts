import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SurveyResultMongoRepository } from './survey-result.repository'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

function makeSut (): SurveyResultMongoRepository {
  return new SurveyResultMongoRepository()
}

function makeSurveyResult ({ surveyId, accountId, answer }: { surveyId: string, accountId: string, answer: string }): SurveyResultModel {
  return {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

async function makeSurvey (): Promise<{ surveyId: string }> {
  const { insertedId } = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
        image: 'any_image'
      },
      {
        answer: 'another_answer'
      }
    ],
    date: new Date()
  })

  return { surveyId: insertedId.toString() }
}

async function makeAccount (): Promise<{ accountId: string }> {
  const { insertedId } = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  return { accountId: insertedId.toString() }
}

describe('SurveyResult Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    surveyResultCollection = await MongoHelper.getCollection('survey-results')
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')

    await surveyResultCollection.deleteMany({})
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  test('should add a survey result is its new', async () => {
    const sut = makeSut()
    const { surveyId } = await makeSurvey()
    const { accountId } = await makeAccount()

    const surveyResult = await sut.save(makeSurveyResult({
      surveyId,
      answer: 'any_answer',
      accountId
    }))

    expect(surveyResult).toBeTruthy()
    expect(surveyResult.id).toBeTruthy()
    expect(surveyResult.answer).toBe('any_answer')
  })
})
