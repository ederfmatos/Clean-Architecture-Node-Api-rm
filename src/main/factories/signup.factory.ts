import { AddAccountRepository } from '../../data/protocols/add-account-repository.protocol'
import { Encrypter } from '../../data/protocols/encrypter.protocol'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account.usecase'
import { AddAccount } from '../../domain/usecases/add-account.usecase'
import { BcryptAdapter } from '../../infra/criptography/bcrypt.adapter'
import { AccountMongoRepository } from '../../infra/database/mongodb/account-repository/account.repository'
import { SignUpController } from '../../presentation/controllers/signup/signup.controller'
import { EmailValidator } from '../../presentation/protocols/email-validator.protocol'
import { EmailValidatorAdapter } from '../../utils/email-validator.adapter'

export function makeSignUpController (): SignUpController {
  const emailValidator: EmailValidator = new EmailValidatorAdapter()
  const encrypter: Encrypter = new BcryptAdapter(12)
  const addAccountRepository: AddAccountRepository = new AccountMongoRepository()
  const addAccount: AddAccount = new DbAddAccount(encrypter, addAccountRepository)
  return new SignUpController(emailValidator, addAccount)
}
