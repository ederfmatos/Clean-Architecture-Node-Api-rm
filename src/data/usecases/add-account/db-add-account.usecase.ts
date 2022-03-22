import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account.protocol'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return null
  }
}
