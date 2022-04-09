import { Decrypter, LoadAccountByTokenRepository, AccountModel, LoadAccountByToken } from './db-load-account-by-token.protocol'

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
