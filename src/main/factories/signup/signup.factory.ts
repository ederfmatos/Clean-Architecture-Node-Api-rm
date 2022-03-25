import { AddAccountRepository } from '../../../data/protocols/database/account/add-account-repository.protocol'
import { Hasher } from '../../../data/protocols/criptography/hasher.protocol'
import { LogErrorRepository } from '../../../data/protocols/database/log/log-error-repository.protocol'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account.usecase'
import { AddAccount } from '../../../domain/usecases/add-account.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt.adapter'
import { AccountMongoRepository } from '../../../infra/database/mongodb/account-repository/account.repository'
import { LogMongoRepository } from '../../../infra/database/mongodb/log-repository/log.repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup.controller'
import { Validation } from '../../../presentation/protocols/validation'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log/log.decorator'
import { makeSignUpValidation } from './signup.validation'
import env from '../../config/env'
import { makeAuthentication } from '../authentication/authetication.factory'

export function makeSignUpController (): Controller {
  const hasher: Hasher = new BcryptAdapter(env.bcryptSalt)
  const addAccountRepository: AddAccountRepository = new AccountMongoRepository()
  const addAccount: AddAccount = new DbAddAccount(hasher, addAccountRepository)
  const validation: Validation = makeSignUpValidation()
  const authentication = makeAuthentication()
  const signUpController: SignUpController = new SignUpController(addAccount, validation, authentication)
  const logErrorRepository: LogErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
