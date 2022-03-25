import { LoginController } from '../../../../presentation/controllers/auth/login/login.controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator.factory'
import { makeAuthentication } from '../../usecases/authentication/db-authetication.factory'
import { makeLoginValidation } from './login.validation'

export function makeLoginController (): Controller {
  const authentication = makeAuthentication()
  const validation = makeLoginValidation()

  const controller = new LoginController(authentication, validation)

  return makeLogControllerDecorator(controller)
}
