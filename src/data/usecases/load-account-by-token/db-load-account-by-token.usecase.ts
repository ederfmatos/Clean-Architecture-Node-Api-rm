import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token.usecase'
import { LoadAccountByTokenRepository } from '../../protocols/database/account/load-account-by-token-repository'
import { AccountModel } from '../add-account/db-add-account.protocol'
import { Decrypter } from '../authentication/db-authentication.protocol'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async loadAccountByToken (token: string, role?: string): Promise<AccountModel> {
    const decryptedToken = await this.decrypter.decrypt(token)
    if (!decryptedToken) {
      return null
    }

    return this.loadAccountByTokenRepository.loadByToken(token, role)
  }
}
