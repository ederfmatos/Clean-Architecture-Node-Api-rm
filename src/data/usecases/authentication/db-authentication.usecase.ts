import {
  AuthenticationModel,
  HashComparer,
  TokenGenerator,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Authentication
} from './db-authentication.protocol'

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
