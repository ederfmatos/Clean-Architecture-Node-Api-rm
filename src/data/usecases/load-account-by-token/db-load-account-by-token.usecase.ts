import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token.usecase'
import { AccountModel } from '../add-account/db-add-account.protocol'
import { Decrypter } from '../authentication/db-authentication.protocol'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async loadAccountByToken (token: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(token)
    return null
  }
}
