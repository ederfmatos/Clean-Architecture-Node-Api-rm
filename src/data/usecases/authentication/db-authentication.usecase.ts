import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication.usecase'
import { HashComparer } from '../../protocols/criptography/hash-comparer.protocol'
import { LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {
  }

  async authenticate (authModel: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authModel.email)
    if (!account) {
      return null
    }

    const result = await this.hashComparer.compare(authModel.password, account.password)
    if (!result) {
      return null
    }

    return ''
  }
}
