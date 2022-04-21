import { MongoHelper } from '@/infra/database/mongodb'
import app from '@/main/config/app'

import { hash } from 'bcrypt'
import request from 'supertest'
import { Collection } from 'mongodb'

describe('Auth Graphql', () => {
  let accountCollection: Collection

  const query = `query {
    login (email: "any_email@mail.com", password: "any_password") {
      accessToken
      name
    }
  }`

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    test('should return an account on valid credentials is provided', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })

      const { status, body: { data: { login } } } = await request(app)
        .post('/graphql')
        .send({ query })

      expect(status).toBe(200)
      expect(login.accessToken).toBeTruthy()
      expect(login.name).toBe('any_name')
    })

    test('should return UnauthorizedError on invalid credentials', async () => {
      const { status, body } = await request(app)
        .post('/graphql')
        .send({ query })

      expect(status).toBe(401)
      expect(body.data).toBeFalsy()
      expect(body.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Mutation', () => {
    const query = `mutation {
      signUp (name: "any_name", email: "any_email@mail.com", password: "123", passwordConfirmation: "123") {
        accessToken
        name
      }
    }`

    test('should return an Account on valid data', async () => {
      const { status, body: { data } } = await request(app)
        .post('/graphql')
        .send({ query })

      expect(status).toBe(200)
      expect(data.signUp.accessToken).toBeTruthy()
      expect(data.signUp.name).toBe('any_name')
    })
  })
})
