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

    test('should return an account on valid credentials is provided', async () => {
      const { status, body: { data: { login } } } = await request(app)
        .post('/graphql')
        .send({ query })

      expect(status).toBe(200)
      expect(login.accessToken).toBeTruthy()
      expect(login.name).toBe('any_name')
    })
  })
})
