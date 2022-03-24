import { AccountModel, AddAccount, AddAccountModel, Hasher, AddAccountRepository } from './db-add-account.protocol'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(account.password)
    return this.addAccountRepository.add({
      name: account.name,
      email: account.email,
      password: hashedPassword
    })
  }
}
