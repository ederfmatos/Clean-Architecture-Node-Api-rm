import { makeLoginValidation } from './login.validation'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'
import { makeAuthentication } from '@/main/factories/usecases/authentication/db-authetication.factory'
import { LoginController } from '@/presentation/controllers/auth/login/login.controller'
import { Controller } from '@/presentation/protocols'

export function makeLoginController (): Controller {
  const authentication = makeAuthentication()
  const validation = makeLoginValidation()

  const controller = new LoginController(authentication, validation)

  return makeLogControllerDecorator(controller)
}
