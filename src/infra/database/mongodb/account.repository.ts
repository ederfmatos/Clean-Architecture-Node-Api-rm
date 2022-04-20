import { LoadAccountByTokenRepository, AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { MongoHelper } from '.'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (addAccountParams: AddAccountRepository.Params): Promise<AddAccountRepository.Response> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    return accountCollection.insertOne(addAccountParams)
      .then(result => !!result.insertedId)
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Response> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(
      { email }, {
        projection: {
          _id: 1,
          name: 1,
          password: 1
        }
      })
    return MongoHelper.mapResult(account)
  }

  async updateAccessToken (accountId: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(accountId) },
      { $set: { accessToken } }
    )
  }

  async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Response> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{ role }, { role: 'ADMIN' }]
    }, {
      projection: {
        _id: 1
      }
    })
    return MongoHelper.mapResult(account)
  }
}
