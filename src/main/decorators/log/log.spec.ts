import { LogErrorRepository } from '@/data/protocols/database/log/log-error-repository.protocol'
import { ok, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from './log.decorator'

function makeFakeRequest (): HttpRequest {
  return {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
}

function makeLogErrorRepository (): LogErrorRepository {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {}
  }

  return new LogErrorRepositoryStub()
}

function makeControllerStub (): Controller {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return ok({ ok: true })
    }
  }

  return new ControllerStub()
}

interface SutType {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

function makeSut (): SutType {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Log Controller Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const httpRequest: HttpRequest = makeFakeRequest()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenNthCalledWith(1, httpRequest)
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ ok: true }))
  })

  test('should call LogErrorRepository with correct error if controllers returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const error = new Error('Internal server error')
    error.stack = 'any_stack'
    jest.spyOn(controllerStub, 'handle')
      .mockImplementationOnce(async () => serverError(error))

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenNthCalledWith(1, error.stack)
  })
})
