import { LogMongoRepository } from '@/infra/database/mongodb'
import { LogControllerDecorator } from '@/main/decorators'
import { Controller } from '@/presentation/protocols'

export function makeLogControllerDecorator (controller: Controller): LogControllerDecorator {
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
