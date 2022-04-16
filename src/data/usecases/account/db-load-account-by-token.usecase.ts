import { Decrypter, LoadAccountByTokenRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { LoadAccountByToken } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async loadAccountByToken (token: string, role?: string): Promise<AccountModel> {
    try {
      const decryptedToken = await this.decrypter.decrypt(token)
      if (!decryptedToken) {
        return null
      }
    } catch (error) {
      return null
    }

    return this.loadAccountByTokenRepository.loadByToken(token, role)
  }
}
