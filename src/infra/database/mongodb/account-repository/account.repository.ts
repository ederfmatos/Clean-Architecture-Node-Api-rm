import { AddAccountRepository } from '../../../../data/protocols/add-account-repository.protocol'
import { AccountModel } from '../../../../domain/models/account.model'
import { AddAccountModel } from '../../../../domain/usecases/add-account.usecase'
import { MongoHelper } from '../helpers/mongo.helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    return accountCollection.insertOne(addAccountModel)
      .then(result => MongoHelper.map(result, addAccountModel))
  }
}
