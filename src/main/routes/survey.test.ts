import { sign } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo.helper'
import app from '../config/app'
import env from '../config/env'

describe('Survey Route', () => {
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

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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

    test('should return 204 on add survey succeds', async () => {
      const accessToken = await makeAccessToken('ADMIN')

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [{ answer: 'any_answer', image: 'any_image' }, { answer: 'another_answer' }]
        })
        .expect(204)
    })

    test('should return 403 on account role is not ADMIN', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [{ answer: 'any_answer', image: 'any_image' }, { answer: 'another_answer' }]
        })
        .expect(403)
    })
  })

  describe('GET /surveys', () => {
    test('should return 403 on load surveys without accessToken fails', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('should return 200 on load surveys with valid accessToken', async () => {
      const accessToken = await makeAccessToken()

      await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{ answer: 'any_answer', image: 'any_image' }],
        date: new Date(),
        id: 'any_id'
      })

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
