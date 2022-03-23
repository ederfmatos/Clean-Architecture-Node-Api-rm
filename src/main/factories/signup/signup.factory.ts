import { AddAccountRepository } from '../../../data/protocols/add-account-repository.protocol'
import { Encrypter } from '../../../data/protocols/encrypter.protocol'
import { LogErrorRepository } from '../../../data/protocols/log-error-repository.protocol'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account.usecase'
import { AddAccount } from '../../../domain/usecases/add-account.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt.adapter'
import { AccountMongoRepository } from '../../../infra/database/mongodb/account-repository/account.repository'
import { LogMongoRepository } from '../../../infra/database/mongodb/log-repository/log.repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup.controller'
import { Validation } from '../../../presentation/helpers/validations/validation'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log/log.decorator'
import { makeSignUpValidation } from './signup.validation'

export function makeSignUpController (): Controller {
  const encrypter: Encrypter = new BcryptAdapter(12)
  const addAccountRepository: AddAccountRepository = new AccountMongoRepository()
  const addAccount: AddAccount = new DbAddAccount(encrypter, addAccountRepository)
  const validation: Validation = makeSignUpValidation()
  const signUpController: SignUpController = new SignUpController(addAccount, validation)
  const logErrorRepository: LogErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
