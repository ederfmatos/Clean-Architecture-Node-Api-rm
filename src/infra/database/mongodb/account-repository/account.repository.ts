import { ObjectId } from 'mongodb'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '../../../../data/protocols/database'
import { AddAccountRepository } from '../../../../data/protocols/database/account/add-account-repository.protocol'
import { AccountModel, AddAccountModel } from '../../../../data/usecases/add-account/db-add-account.protocol'
import { MongoHelper } from '../helpers/mongo.helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    return accountCollection.insertOne(addAccountModel)
      .then(result => MongoHelper.map(result, addAccountModel))
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
}
