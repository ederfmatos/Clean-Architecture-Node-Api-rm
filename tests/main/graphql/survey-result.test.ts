import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/database/mongodb'

import { Collection } from 'mongodb'
import request from 'supertest'
import { JwtAdapter } from '@/infra/criptography'

let surveyCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any name',
    email: 'any_email@mail.com',
    password: '123',
    role: 'ADMIN'
  })
  const id = res.insertedId.toString()
  const accessToken = await new JwtAdapter(env.jwtSecret).encrypt(id)
  await accountCollection.updateOne({ _id: res.insertedId }, { $set: { accessToken } })
  return accessToken
}

describe('SurveyResult GraphQL', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    accountCollection = MongoHelper.getCollection('accounts')

    await Promise.all([
      surveyCollection.deleteMany({}),
      accountCollection.deleteMany({})
    ])
  })

  describe('SurveyResult Query', () => {
    test('should return SurveyResult', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()

      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: now
      })

      const query = `query {
        surveyResult (surveyId: "${surveyRes.insertedId.toString()}") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }`

      const { status, body: { data } } = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })

      expect(status).toBe(200)
      expect(data.surveyResult.question).toBe('Question')
      expect(data.surveyResult.date).toBe(now.toISOString())
      expect(data.surveyResult.answers).toEqual([
        {
          answer: 'Answer 1',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        }, {
          answer: 'Answer 2',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        }
      ])
    })

    test('should return AccessDeniedError if no token is provided', async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          { answer: 'Answer 1', image: 'http://image-name.com' },
          { answer: 'Answer 2' }
        ],
        date: new Date()
      })

      const query = `query {
        surveyResult (surveyId: "${surveyRes.insertedId.toString()}") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }`

      const { status, body } = await request(app)
        .post('/graphql')
        .send({ query })

      expect(status).toBe(403)
      expect(body.data).toBeFalsy()
      expect(body.errors[0].message).toBe('Access Denied')
    })
  })

  describe('SaveSurveyResult Mutation', () => {
    test('should return AccessDeniedError if no token is provided', async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          { answer: 'Answer 1', image: 'http://image-name.com' },
          { answer: 'Answer 2' }],
        date: new Date()
      })

      const query = `mutation {
        saveSurveyResult (surveyId: "${surveyRes.insertedId.toString()}", answer: "Answer 1") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }`

      const { status, body } = await request(app)
        .post('/graphql')
        .send({ query })

      expect(status).toBe(403)
      expect(body.data).toBeFalsy()
      expect(body.errors[0].message).toBe('Access Denied')
    })

    test('should return SurveyResult', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()

      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: now
      })

      const query = `mutation {
        saveSurveyResult (surveyId: "${surveyRes.insertedId.toString()}", answer: "Answer 1") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }`

      const { status, body: { data } } = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })

      expect(status).toBe(200)
      expect(data.saveSurveyResult.question).toBe('Question')
      expect(data.saveSurveyResult.date).toBe(now.toISOString())
      expect(data.saveSurveyResult.answers).toEqual([{
        answer: 'Answer 1',
        count: 1,
        percent: 100,
        isCurrentAccountAnswer: true
      }, {
        answer: 'Answer 2',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }])
    })
  })
})
