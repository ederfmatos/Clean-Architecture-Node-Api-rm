import { LoadAccountByEmailRepository, HashComparer, UpdateAccessTokenRepository, Encrypter } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly Encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async authenticate (authModel: Authentication.Params): Promise<Authentication.Response> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authModel.email)
    if (!account) {
      return null
    }

    const result = await this.hashComparer.compare(authModel.password, account.password)
    if (!result) {
      return null
    }

    const accessToken = await this.Encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
    return {
      accessToken,
      name: account.name
    }
  }
}
