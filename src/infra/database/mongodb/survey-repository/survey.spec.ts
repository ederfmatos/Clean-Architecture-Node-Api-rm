import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo.helper'
import { SurveyMongoRepository } from './survey.repository'

function makeSut (): SurveyMongoRepository {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

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
      ]
    })

    const count = await surveyCollection.countDocuments()

    expect(count).toBe(1)
  })
})
