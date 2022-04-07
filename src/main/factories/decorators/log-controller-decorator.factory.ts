import { LogMongoRepository } from '@/infra/database/mongodb/log-repository/log.repository'
import { LogControllerDecorator } from '@/main/decorators/log/log.decorator'
import { Controller } from '@/presentation/protocols'

export function makeLogControllerDecorator (controller: Controller): LogControllerDecorator {
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
