import { AccountModel } from '@/domain/models'
import { AccountMongoRepository, MongoHelper } from '@/infra/database/mongodb'
import { mockAccountModelWithToken, mockAddAccountParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'

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

  describe('add()', () => {
    test('should return an account on add success', async () => {
      const sut = makeSut()

      const account = await sut.add(mockAddAccountParams())

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('should return an account on load by email success', async () => {
      const sut = makeSut()

      await accountCollection.insertOne(mockAddAccountParams())

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
  })

  describe('updateAccessToken()', () => {
    test('should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()

      const { insertedId } = await accountCollection.insertOne(mockAddAccountParams())

      const accountId = insertedId.toString()

      let account = await accountCollection.findOne<AccountModel>()
      expect(account.accessToken).toBeFalsy()

      await sut.updateAccessToken(accountId, 'new_access_token')

      account = await accountCollection.findOne<AccountModel>()

      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('new_access_token')
    })
  })

  describe('loadByToken()', () => {
    test('should return an account on load by token without role success', async () => {
      const sut = makeSut()

      await accountCollection.insertOne(mockAccountModelWithToken())

      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('hashed_password')
    })

    test('should return an account on load by token with admin role success', async () => {
      const sut = makeSut()

      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })

      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return null on load by token with role fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByToken('any_token', 'any_role')

      expect(account).toBeFalsy()
    })

    test('should return null on load by token with invalid fails', async () => {
      const sut = makeSut()

      await accountCollection.insertOne(mockAccountModelWithToken())

      const account = await sut.loadByToken('any_token', 'any_role')

      expect(account).toBeFalsy()
    })

    test('should return null on load by token with role fails', async () => {
      const sut = makeSut()

      await accountCollection.insertOne(mockAccountModelWithToken('any_role'))

      const account = await sut.loadByToken('any_token')

      expect(account).toBeFalsy()
    })

    test('should return an account on load by token if user is admin', async () => {
      const sut = makeSut()

      await accountCollection.insertOne(mockAccountModelWithToken('ADMIN'))

      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('hashed_password')
    })
  })
})
