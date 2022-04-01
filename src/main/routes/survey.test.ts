import { sign } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo.helper'
import app from '../config/app'
import env from '../config/env'

describe('Survey Route', () => {
  let surveyCollection: Collection
  let accountCollection: Collection

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
      const { insertedId } = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'ADMIN'
      })

      const accountId = insertedId.toString()
      const accessToken = sign({ id: accountId }, env.jwtSecret)

      await accountCollection.updateOne(
        { _id: new ObjectId(accountId) },
        { $set: { accessToken } }
      )

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
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
        .expect(204)
    })

    test('should return 403 on account role is not ADMIN', async () => {
      const { insertedId } = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })

      const accountId = insertedId.toString()
      const accessToken = sign({ id: accountId }, env.jwtSecret)

      await accountCollection.updateOne(
        { _id: new ObjectId(accountId) },
        { $set: { accessToken } }
      )

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
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
