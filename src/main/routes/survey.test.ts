import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo.helper'
import app from '../config/app'

describe('Survey Route', () => {
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

  describe('POST /surveys', () => {
    test('should return 403 on add survey without accessToken fails', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
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
        .expect(403)
    })
  })
})
