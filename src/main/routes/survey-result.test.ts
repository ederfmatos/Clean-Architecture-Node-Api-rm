import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import app from '@/main/config/app'

describe('Survey Result Route', () => {
  let surveyResultsCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyResultsCollection = await MongoHelper.getCollection('survey-results')
    await surveyResultsCollection.deleteMany({})
  })

  describe('PUT /surveys/:survey_id/results', () => {
    test('should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
