import { SaveSurveyResult } from '@/domain/usecases'
import { MongoHelper, SurveyResultMongoRepository } from '@/infra/database/mongodb'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import MockDate from 'mockdate'
import { Collection, ObjectId } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

function makeSut (): SurveyResultMongoRepository {
  return new SurveyResultMongoRepository()
}

function mockSurveyResult ({ surveyId, accountId, answer }: { surveyId: string, accountId: string, answer: string }): SaveSurveyResult.Params {
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
    surveyResultCollection = MongoHelper.getCollection('survey-results')
    surveyCollection = MongoHelper.getCollection('surveys')
    accountCollection = MongoHelper.getCollection('accounts')

    await Promise.all([
      surveyResultCollection.deleteMany({}),
      surveyCollection.deleteMany({}),
      accountCollection.deleteMany({})
    ])
  })

  describe('save()', () => {
    test('should add a survey result if its new', async () => {
      const sut = makeSut()
      const { surveyId } = await mockSurvey()
      const { accountId } = await mockAccount()

      await sut.save(mockSurveyResult({
        surveyId,
        answer: 'any_answer',
        accountId
      }))

      const count = await surveyResultCollection.countDocuments()
      expect(count).toBe(1)
    })

    test('should update survey result if its not new', async () => {
      const { surveyId } = await mockSurvey()
      const { accountId } = await mockAccount()

      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(accountId),
        answer: 'any_answer',
        date: new Date()
      })

      const sut = makeSut()
      await sut.save(mockSurveyResult({
        surveyId,
        answer: 'another_answer',
        accountId
      }))

      const count = await surveyResultCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('should load survey result', async () => {
      const { surveyId } = await mockSurvey()
      const { accountId: firstAccount } = await mockAccount()
      const { accountId: secondAccount } = await mockAccount()

      const makeSurveyResult = (account: string): object => ({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(account),
        date: new Date(),
        answer: 'any_answer'
      })

      await surveyResultCollection.insertMany([
        makeSurveyResult(firstAccount),
        makeSurveyResult(secondAccount)
      ])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(surveyId, firstAccount)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(surveyId)
      expect(surveyResult.answers[0].answer).toBe('any_answer')
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)

      expect(surveyResult.answers[1].answer).toBe('another_answer')
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('should load survey result 2', async () => {
      const { surveyId } = await mockSurvey()
      const { accountId: firstAccount } = await mockAccount()
      const { accountId: secondAccount } = await mockAccount()
      const { accountId: thirdAccount } = await mockAccount()

      const makeSurveyResult = (account: string, answer: string): object => ({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(account),
        date: new Date(),
        answer
      })

      await surveyResultCollection.insertMany([
        makeSurveyResult(firstAccount, 'any_answer'),
        makeSurveyResult(secondAccount, 'another_answer'),
        makeSurveyResult(thirdAccount, 'another_answer')
      ])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(surveyId, secondAccount)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(surveyId)

      expect(surveyResult.answers[0].answer).toBe('another_answer')
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)

      expect(surveyResult.answers[1].answer).toBe('any_answer')
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('should load survey result 3', async () => {
      const { surveyId } = await mockSurvey()
      const { accountId: firstAccount } = await mockAccount()
      const { accountId: secondAccount } = await mockAccount()
      const { accountId: thirdAccount } = await mockAccount()

      const makeSurveyResult = (account: string, answer: string): object => ({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(account),
        date: new Date(),
        answer
      })

      await surveyResultCollection.insertMany([
        makeSurveyResult(firstAccount, 'any_answer'),
        makeSurveyResult(secondAccount, 'another_answer')
      ])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(surveyId, thirdAccount)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(surveyId)

      expect(surveyResult.answers[0].answer).toBe('another_answer')
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(false)

      expect(surveyResult.answers[1].answer).toBe('any_answer')
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })
  })
})
