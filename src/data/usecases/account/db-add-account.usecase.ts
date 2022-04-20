import { Hasher, AddAccountRepository, ExistsAccountByEmailRepository } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly existsAccountByEmailRepository: ExistsAccountByEmailRepository
  ) {}

  async add (account: AddAccount.Params): Promise<AddAccount.Response> {
    const existingAccountWithEmail = await this.existsAccountByEmailRepository.existsByEmail(account.email)
    if (existingAccountWithEmail) {
      return false
    }

    const hashedPassword = await this.hasher.hash(account.password)
    return this.addAccountRepository.add({
      name: account.name,
      email: account.email,
      password: hashedPassword
    })
  }
}
