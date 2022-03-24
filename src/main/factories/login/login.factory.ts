import { Encrypter, HashComparer } from '../../../data/protocols/criptography'
import { LogErrorRepository } from '../../../data/protocols/database'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication.usecase'
import { Authentication } from '../../../domain/usecases/authentication.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt.adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt.adapter'
import { AccountMongoRepository } from '../../../infra/database/mongodb/account-repository/account.repository'
import { LogMongoRepository } from '../../../infra/database/mongodb/log-repository/log.repository'
import { LoginController } from '../../../presentation/controllers/login/login.controller'
import { Controller } from '../../../presentation/protocols'
import { Validation } from '../../../presentation/protocols/validation'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log/log.decorator'
import { makeLoginValidation } from './login.validation'

function makeAuthentication (): Authentication {
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

export function makeLoginController (): Controller {
  const authentication: Authentication = makeAuthentication()
  const validation: Validation = makeLoginValidation()

  const loginController: LoginController = new LoginController(authentication, validation)
  const logErrorRepository: LogErrorRepository = new LogMongoRepository()

  return new LogControllerDecorator(loginController, logErrorRepository)
}
