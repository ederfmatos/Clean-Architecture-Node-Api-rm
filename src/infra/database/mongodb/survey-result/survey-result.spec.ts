import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { SurveyResultMongoRepository } from './survey-result.repository'
import { Collection } from 'mongodb'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'
import { mockAddAccountParams } from '@/domain/test'
import MockDate from 'mockdate'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

function makeSut (): SurveyResultMongoRepository {
  return new SurveyResultMongoRepository()
}

function mockSurveyResult ({ surveyId, accountId, answer }: { surveyId: string, accountId: string, answer: string }): SaveSurveyResultParams {
  return {
    surveyId,
    accountId,
    answer,
    date: new Date()
  }
}

async function mockSurvey (): Promise<{ surveyId: string }> {
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

async function mockAccount (): Promise<{ accountId: string }> {
  const { insertedId } = await accountCollection.insertOne(mockAddAccountParams())

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

  describe('save()', () => {
    test('should add a survey result is its new', async () => {
      const sut = makeSut()
      const { surveyId } = await mockSurvey()
      const { accountId } = await mockAccount()

      const surveyResult = await sut.save(mockSurveyResult({
        surveyId,
        answer: 'any_answer',
        accountId
      }))

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe('any_answer')
    })

    test('should update survey result is its not new', async () => {
      const { surveyId } = await mockSurvey()
      const { accountId } = await mockAccount()

      const { insertedId } = await surveyResultCollection.insertOne(mockSurveyResult({
        surveyId,
        answer: 'any_answer',
        accountId
      }))
      const surveyResultId = insertedId.toString()

      const sut = makeSut()
      const surveyResult = await sut.save(mockSurveyResult({
        surveyId,
        answer: 'other_answer',
        accountId
      }))

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.id).toBe(surveyResultId)
      expect(surveyResult.answer).toBe('other_answer')
    })
  })
})
