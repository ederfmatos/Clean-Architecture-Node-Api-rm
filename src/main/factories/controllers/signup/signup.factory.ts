import { SignUpController } from '../../../../presentation/controllers/signup/signup.controller'
import { Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup.validation'
import { makeAuthentication } from '../../usecases/authentication/db-authetication.factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account.factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator.factory'

export function makeSignUpController (): Controller {
  const validation = makeSignUpValidation()
  const authentication = makeAuthentication()
  const addAccount = makeDbAddAccount()

  const controller = new SignUpController(addAccount, validation, authentication)

  return makeLogControllerDecorator(controller)
}
