import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication.usecase'
import { LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {

  }

  async authenticate (authModel: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authModel.email)
    return ''
  }
}
