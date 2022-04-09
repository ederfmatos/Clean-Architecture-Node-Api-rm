import { SurveyMongoRepository } from './survey.repository'
import { Collection } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey.model'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import MockDate from 'mockdate'

function makeSut (): SurveyMongoRepository {
  return new SurveyMongoRepository()
}

function makeSurvey (question: string): SurveyModel {
  return {
    question,
    answers: [
      {
        answer: 'any_answer',
        image: 'any_image'
      },
      {
        answer: 'another_answer'
      }
    ],
    date: new Date(),
    id: 'any_id'
  }
}

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add()', () => {
    test('should add survey', async () => {
      const sut = makeSut()

      await sut.add({
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

      const count = await surveyCollection.countDocuments()

      expect(count).toBe(1)
    })
  })

  describe('findAll()', () => {
    test('should return a list os Surveys', async () => {
      const sut = makeSut()

      await surveyCollection.insertMany([
        makeSurvey('any_question'),
        makeSurvey('other_question')
      ])

      const surveys = await sut.findAll()
      expect(surveys.length).toEqual(2)
      expect(surveys[0].question).toEqual('any_question')
      expect(surveys[1].question).toEqual('other_question')
    })

    test('should return empty list', async () => {
      const sut = makeSut()

      const surveys = await sut.findAll()
      expect(surveys.length).toEqual(0)
    })
  })

  describe('loadById()', () => {
    test('should return a survey', async () => {
      const sut = makeSut()

      const { insertedId } = await surveyCollection.insertOne(makeSurvey('any_question'))
      const surveyId = insertedId.toString()

      const survey = await sut.loadById(surveyId)
      expect(survey).toEqual(makeSurvey('any_question'))
    })

    test('should return null if load by id fails', async () => {
      const sut = makeSut()

      const survey = await sut.loadById('123456789012345678901234')
      expect(survey).toBeFalsy()
    })
  })
})
