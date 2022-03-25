import { HashComparer, Encrypter } from '../../../../data/protocols/criptography'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication.usecase'
import { Authentication } from '../../../../domain/usecases/authentication.usecase'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt.adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt/jwt.adapter'
import { AccountMongoRepository } from '../../../../infra/database/mongodb/account-repository/account.repository'
import env from '../../../config/env'

export function makeAuthentication (): Authentication {
  const accountMongoRepository: AccountMongoRepository = new AccountMongoRepository()
  const hashComparer: HashComparer = new BcryptAdapter(env.bcryptSalt)
  const encrypter: Encrypter = new JwtAdapter(env.jwtSecret)

  return new DbAuthentication(
    accountMongoRepository,
    hashComparer,
    encrypter,
    accountMongoRepository
  )
}
