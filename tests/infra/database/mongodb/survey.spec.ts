import { MongoHelper, SurveyMongoRepository } from '@/infra/database/mongodb'
import { mockAddAccountParams, mockAddSurveyParams, mockSurveyModel } from '@/tests/domain/mocks'
import MockDate from 'mockdate'
import { Collection, ObjectId } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

function makeSut (): SurveyMongoRepository {
  return new SurveyMongoRepository()
}

async function mockAccount (): Promise<{ accountId: string }> {
  const { insertedId } = await accountCollection.insertOne(mockAddAccountParams())

  return { accountId: insertedId.toString() }
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    accountCollection = MongoHelper.getCollection('accounts')
    surveyResultCollection = MongoHelper.getCollection('survey-results')

    await Promise.all([
      surveyCollection.deleteMany({}),
      accountCollection.deleteMany({}),
      surveyResultCollection.deleteMany({})
    ])
  })

  describe('add()', () => {
    test('should add survey', async () => {
      const sut = makeSut()

      await sut.add(mockAddSurveyParams())

      const count = await surveyCollection.countDocuments()

      expect(count).toBe(1)
    })
  })

  describe('findAll()', () => {
    test('should return a list os Surveys', async () => {
      const { accountId } = await mockAccount()
      const sut = makeSut()

      const response = await surveyCollection.insertMany([
        mockSurveyModel('any_question'),
        mockSurveyModel('other_question')
      ])
      const surveyId = response.insertedIds[0].toString()

      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(accountId),
        answer: 'any_answer',
        date: new Date()
      })

      const surveys = await sut.findAll(accountId)

      expect(surveys.length).toEqual(2)
      expect(surveys[0].question).toEqual('any_question')
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toEqual('other_question')
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('should return empty list', async () => {
      const { accountId } = await mockAccount()
      const sut = makeSut()

      const surveys = await sut.findAll(accountId)
      expect(surveys.length).toEqual(0)
    })
  })

  describe('loadById()', () => {
    test('should return a survey', async () => {
      const sut = makeSut()

      const { insertedId } = await surveyCollection.insertOne(mockSurveyModel('any_question'))
      const surveyId = insertedId.toString()

      const survey = await sut.loadById(surveyId)
      expect(survey).toEqual(mockSurveyModel('any_question'))
    })

    test('should return null if load by id fails', async () => {
      const sut = makeSut()

      const survey = await sut.loadById('123456789012345678901234')
      expect(survey).toBeFalsy()
    })
  })

  describe('existsById()', () => {
    test('should return true if survey exists', async () => {
      const sut = makeSut()

      const { insertedId } = await surveyCollection.insertOne(mockSurveyModel('any_question'))
      const surveyId = insertedId.toString()

      const exists = await sut.existsById(surveyId)
      expect(exists).toBe(true)
    })

    test('should return false if survey not exists', async () => {
      const sut = makeSut()

      const exists = await sut.existsById('123456789012345678901234')
      expect(exists).toBe(false)
    })
  })

  describe('loadAnswers()', () => {
    test('should load answers on success', async () => {
      const sut = makeSut()

      const { insertedId } = await surveyCollection.insertOne(mockSurveyModel('any_question'))
      const surveyId = insertedId.toString()

      const answers = await sut.loadAnswers(surveyId)
      expect(answers).toEqual(['any_answer'])
    })

    test('should null on if survey does not exists', async () => {
      const sut = makeSut()

      const answers = await sut.loadAnswers('123456789012345678901234')
      expect(answers).toBeFalsy()
    })
  })
})
