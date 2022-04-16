import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers'
import { makeSignUpValidation, makeLogControllerDecorator, makeDbAddAccount, makeAuthentication } from '@/main/factories'

export function makeSignUpController (): Controller {
  const validation = makeSignUpValidation()
  const authentication = makeAuthentication()
  const addAccount = makeDbAddAccount()

  const controller = new SignUpController(addAccount, validation, authentication)

  return makeLogControllerDecorator(controller)
}
