import { LogErrorRepository } from '../../../data/protocols/database'
import { Authentication } from '../../../domain/usecases/authentication.usecase'
import { LogMongoRepository } from '../../../infra/database/mongodb/log-repository/log.repository'
import { LoginController } from '../../../presentation/controllers/login/login.controller'
import { Controller } from '../../../presentation/protocols'
import { Validation } from '../../../presentation/protocols/validation'
import { LogControllerDecorator } from '../../decorators/log/log.decorator'
import { makeAuthentication } from '../authentication/authetication.factory'
import { makeLoginValidation } from './login.validation'

export function makeLoginController (): Controller {
  const authentication: Authentication = makeAuthentication()
  const validation: Validation = makeLoginValidation()

  const loginController: LoginController = new LoginController(authentication, validation)
  const logErrorRepository: LogErrorRepository = new LogMongoRepository()

  return new LogControllerDecorator(loginController, logErrorRepository)
}
