import env from '@/main/config/env'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/database/mongodb'

import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { JwtAdapter } from '@/infra/criptography'

let surveyCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: '12345678',
    role: 'ADMIN'
  })

  const id = res.insertedId.toString()
  const accessToken = await new JwtAdapter(env.jwtSecret).encrypt(id)

  await accountCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { accessToken } }
  )

  return accessToken
}

describe('Survey GraphQL', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')

    await Promise.all([
      surveyCollection.deleteMany({}),
      accountCollection.deleteMany({})
    ])
  })

  describe('Surveys Query', () => {
    const query = `query {
      surveys {
        id
        question
        answers {
          image
          answer
        }
        date
        didAnswer
      }
    }`

    test('Should return Surveys', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()

      await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          { answer: 'Answer 1', image: 'http://image-name.com' },
          { answer: 'Answer 2' }
        ],
        date: now
      })

      const { status, body: { data } } = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })

      expect(status).toBe(200)
      expect(data.surveys.length).toBe(1)
      expect(data.surveys[0].id).toBeTruthy()
      expect(data.surveys[0].question).toBe('Question')
      expect(data.surveys[0].date).toBe(now.toISOString())
      expect(data.surveys[0].didAnswer).toBe(false)
      expect(data.surveys[0].answers).toEqual([
        { answer: 'Answer 1', image: 'http://image-name.com' },
        { answer: 'Answer 2', image: null }
      ])
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          { answer: 'Answer 1', image: 'http://image-name.com' },
          { answer: 'Answer 2' }
        ],
        date: new Date()
      })

      const { status, body } = await request(app)
        .post('/graphql')
        .send({ query })

      expect(status).toBe(403)
      expect(body.data).toBeFalsy()
      expect(body.errors[0].message).toBe('Access Denied')
    })
  })
})
