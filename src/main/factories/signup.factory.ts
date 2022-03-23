import { AddAccountRepository } from '../../data/protocols/add-account-repository.protocol'
import { Encrypter } from '../../data/protocols/encrypter.protocol'
import { LogErrorRepository } from '../../data/protocols/log-error-repository.protocol'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account.usecase'
import { AddAccount } from '../../domain/usecases/add-account.usecase'
import { BcryptAdapter } from '../../infra/criptography/bcrypt.adapter'
import { AccountMongoRepository } from '../../infra/database/mongodb/account-repository/account.repository'
import { LogMongoRepository } from '../../infra/database/mongodb/log-repository/log.repository'
import { SignUpController } from '../../presentation/controllers/signup/signup.controller'
import { Controller } from '../../presentation/protocols'
import { EmailValidator } from '../../presentation/protocols/email-validator.protocol'
import { EmailValidatorAdapter } from '../../utils/email-validator.adapter'
import { LogControllerDecorator } from '../decorators/log/log.decorator'

export function makeSignUpController (): Controller {
  const emailValidator: EmailValidator = new EmailValidatorAdapter()
  const encrypter: Encrypter = new BcryptAdapter(12)
  const addAccountRepository: AddAccountRepository = new AccountMongoRepository()
  const addAccount: AddAccount = new DbAddAccount(encrypter, addAccountRepository)
  const signUpController: SignUpController = new SignUpController(emailValidator, addAccount)
  const logErrorRepository: LogErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
