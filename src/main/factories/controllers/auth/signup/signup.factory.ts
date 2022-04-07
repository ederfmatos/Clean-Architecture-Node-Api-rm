import { makeSignUpValidation } from './signup.validation'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account.factory'
import { makeAuthentication } from '@/main/factories/usecases/authentication/db-authetication.factory'
import { SignUpController } from '@/presentation/controllers/auth/signup/signup.controller'
import { Controller } from '@/presentation/protocols'

export function makeSignUpController (): Controller {
  const validation = makeSignUpValidation()
  const authentication = makeAuthentication()
  const addAccount = makeDbAddAccount()

  const controller = new SignUpController(addAccount, validation, authentication)

  return makeLogControllerDecorator(controller)
}
