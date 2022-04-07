import { AccountModel } from '@/domain/models/account.model'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token.usecase'
import { Decrypter } from '@/data/protocols/criptography'
import { LoadAccountByTokenRepository } from '@/data/protocols/database/account/load-account-by-token-repository'

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
