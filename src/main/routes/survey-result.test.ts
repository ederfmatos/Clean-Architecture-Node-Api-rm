import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import app from '@/main/config/app'
import env from '@/main/config/env'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'

describe('Survey Result Route', () => {
  let surveyResultsCollection: Collection
  let surveyCollection: Collection
  let accountCollection: Collection

  async function makeAccessToken (role?: string): Promise<string> {
    const { insertedId } = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      role
    })

    const accountId = insertedId.toString()
    const accessToken = sign({ id: accountId }, env.jwtSecret)

    await accountCollection.updateOne(
      { _id: new ObjectId(accountId) },
      { $set: { accessToken } }
    )

    return accessToken
  }

  async function makeSurvey (): Promise<string> {
    const { insertedId } = await surveyCollection.insertOne({
      question: 'any_question',
      answers: [{ answer: 'Answer 1', image: 'any_image' }, { answer: 'Answer 2', image: 'any_image' }],
      date: new Date(),
      id: 'any_id'
    })

    return insertedId.toString()
  }

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyResultsCollection = await MongoHelper.getCollection('survey-results')
    accountCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')

    await Promise.all([
      surveyResultsCollection.deleteMany({}),
      accountCollection.deleteMany({}),
      accountCollection.deleteMany({})
    ])
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

    test('should return 200 on save survey result succeds', async () => {
      const accessToken = await makeAccessToken()

      const surveyId = await makeSurvey()

      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'Answer 1' })
        .expect(200)
    })
  })
})
