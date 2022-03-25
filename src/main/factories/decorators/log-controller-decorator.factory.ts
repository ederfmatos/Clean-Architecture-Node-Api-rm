import { LogMongoRepository } from '../../../infra/database/mongodb/log-repository/log.repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log/log.decorator'

export function makeLogControllerDecorator (controller: Controller): LogControllerDecorator {
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
