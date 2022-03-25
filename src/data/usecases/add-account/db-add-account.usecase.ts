import { AccountModel, AddAccount, AddAccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account.protocol'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const existingAccountWithEmail = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    if (existingAccountWithEmail) {
      return null
    }

    const hashedPassword = await this.hasher.hash(account.password)
    return this.addAccountRepository.add({
      name: account.name,
      email: account.email,
      password: hashedPassword
    })
  }
}
