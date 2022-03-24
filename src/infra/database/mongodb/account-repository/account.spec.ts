import { Collection } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account.model'
import { MongoHelper } from '../helpers/mongo.helper'
import { AccountMongoRepository } from './account.repository'

function makeSut (): AccountMongoRepository {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  let accountCollection: Collection

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

  test('should return an account on add success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('should return an account on load by email success', async () => {
    const sut = makeSut()

    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('should return null on load by email fails', async () => {
    const sut = makeSut()

    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeFalsy()
  })

  test('should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()

    const { insertedId } = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    const accountId = insertedId.toString()

    let account = await accountCollection.findOne<AccountModel>()
    expect(account.accessToken).toBeFalsy()

    await sut.updateAccessToken(accountId, 'new_access_token')

    account = await accountCollection.findOne<AccountModel>()

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('new_access_token')
  })
})
