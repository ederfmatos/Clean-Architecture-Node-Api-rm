import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'
import { makeLoginValidation, makeLogControllerDecorator, makeAuthentication } from '@/main/factories'

export function makeLoginController (): Controller {
  const authentication = makeAuthentication()
  const validation = makeLoginValidation()

  const controller = new LoginController(authentication, validation)

  return makeLogControllerDecorator(controller)
}
