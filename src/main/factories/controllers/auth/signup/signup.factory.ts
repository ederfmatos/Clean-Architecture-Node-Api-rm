import { SignUpController } from '../../../../../presentation/controllers/auth/signup/signup.controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator.factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account.factory'
import { makeAuthentication } from '../../../usecases/authentication/db-authetication.factory'
import { makeSignUpValidation } from './signup.validation'

export function makeSignUpController (): Controller {
  const validation = makeSignUpValidation()
  const authentication = makeAuthentication()
  const addAccount = makeDbAddAccount()

  const controller = new SignUpController(addAccount, validation, authentication)

  return makeLogControllerDecorator(controller)
}
