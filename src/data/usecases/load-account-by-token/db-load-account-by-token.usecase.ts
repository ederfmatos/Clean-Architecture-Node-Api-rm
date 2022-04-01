import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token.usecase'
import { AccountModel } from '../add-account/db-add-account.protocol'
import { Decrypter } from '../authentication/db-authentication.protocol'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async loadAccountByToken (token: string, role?: string): Promise<AccountModel> {
    const decryptedToken = await this.decrypter.decrypt(token)
    if (!decryptedToken) {
      return null
    }

    return null
  }
}
