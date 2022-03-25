import { HashComparer, Encrypter } from '../../../data/protocols/criptography'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication.usecase'
import { Authentication } from '../../../domain/usecases/authentication.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt.adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt.adapter'
import { AccountMongoRepository } from '../../../infra/database/mongodb/account-repository/account.repository'
import env from '../../config/env'

class AuthenticationFactorySingleton {
  readonly instance: Authentication

  constructor () {
    const accountMongoRepository: AccountMongoRepository = new AccountMongoRepository()
    const hashComparer: HashComparer = new BcryptAdapter(env.bcryptSalt)
    const encrypter: Encrypter = new JwtAdapter(env.jwtSecret)

    this.instance = new DbAuthentication(
      accountMongoRepository,
      hashComparer,
      encrypter,
      accountMongoRepository
    )
  }
}

let factory: AuthenticationFactorySingleton

export function makeAuthentication (): Authentication {
  if (!factory) {
    factory = new AuthenticationFactorySingleton()
  }

  return factory.instance
}
