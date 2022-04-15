import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/database'
import { AddAccountRepository } from '@/data/protocols/database/account/add-account-repository.protocol'
import { LoadAccountByTokenRepository } from '@/data/protocols/database/account/load-account-by-token-repository'
import { AccountModel, AddAccountParams } from '@/data/usecases/account/add-account/db-add-account.protocol'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (addAccountParams: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    return accountCollection.insertOne(addAccountParams)
      .then(result => MongoHelper.map(result, addAccountParams))
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return MongoHelper.mapResult(account)
  }

  async updateAccessToken (accountId: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(accountId) },
      { $set: { accessToken } }
    )
  }

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{ role }, { role: 'ADMIN' }]
    })
    return MongoHelper.mapResult(account)
  }
}
