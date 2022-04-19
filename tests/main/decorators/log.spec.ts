import { LogErrorRepository } from '@/data/protocols'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { LogControllerDecorator } from '@/main/decorators'
import { mockLogErrorRepository } from '@/tests/data/mocks'

type SutType = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

function makeSut (): SutType {
  const controllerStub = mockControllerStub()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

function mockRequest (): any {
  return {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
}

function mockControllerStub (): Controller {
  class ControllerStub implements Controller {
    async handle (request: any): Promise<HttpResponse> {
      return ok({ ok: true })
    }
  }

  return new ControllerStub()
}

describe('Log Controller Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const request = mockRequest()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(request)
    expect(handleSpy).toHaveBeenNthCalledWith(1, request)
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const request = mockRequest()

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ ok: true }))
  })

  test('should call LogErrorRepository with correct error if controllers returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const error = new Error('Internal server error')
    error.stack = 'any_stack'
    jest.spyOn(controllerStub, 'handle')
      .mockImplementationOnce(async () => serverError(error))

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    await sut.handle(mockRequest())
    expect(logSpy).toHaveBeenNthCalledWith(1, error.stack)
  })
})
