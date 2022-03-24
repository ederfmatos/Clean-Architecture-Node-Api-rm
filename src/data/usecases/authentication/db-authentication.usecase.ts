import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication.usecase'
import { HashComparer } from '../../protocols/criptography/hash-comparer.protocol'
import { TokenGenerator } from '../../protocols/criptography/token-generator.proptocol'
import { LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../protocols/database/update-access-token-repository.protocol'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async authenticate (authModel: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authModel.email)
    if (!account) {
      return null
    }

    const result = await this.hashComparer.compare(authModel.password, account.password)
    if (!result) {
      return null
    }

    const accessToken = await this.tokenGenerator.generate(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
    return accessToken
  }
}
