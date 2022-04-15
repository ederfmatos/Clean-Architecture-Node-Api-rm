import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { SurveyResultMongoRepository } from './survey-result.repository'
import { Collection, ObjectId } from 'mongodb'
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
      expect(surveyResult.surveyId.toString()).toEqual(surveyId)
      expect(surveyResult.answers[0].answer).toBe('any_answer')
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[1].answer).toBe('another_answer')
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })

    test('should update survey result is its not new', async () => {
      const { surveyId } = await mockSurvey()
      const { accountId } = await mockAccount()

      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(accountId),
        answer: 'any_answer',
        date: new Date()
      })

      const sut = makeSut()
      const surveyResult = await sut.save(mockSurveyResult({
        surveyId,
        answer: 'another_answer',
        accountId
      }))

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(surveyId)
      expect(surveyResult.answers[0].answer).toBe('another_answer')
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)

      expect(surveyResult.answers[1].answer).toBe('any_answer')
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })
  })
})
