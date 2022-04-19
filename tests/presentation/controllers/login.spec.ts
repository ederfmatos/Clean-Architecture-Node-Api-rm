import { Authentication } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors'
import { LoginController } from '@/presentation/controllers'
import { Validation } from '@/presentation/protocols'
import { unauthorized, serverError, ok, badRequest } from '@/presentation/helpers'
import { mockValidation } from '@/tests/validation/mocks'
import { mockAuthentication } from '@/tests/presentation/mocks'

type SutType = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

function makeSut (): SutType {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return { sut, authenticationStub, validationStub }
}

function mockRequest (): LoginController.Request {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

describe('Login Controller', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authenticationSpy = jest.spyOn(authenticationStub, 'authenticate')

    const request = mockRequest()

    await sut.handle(request)

    expect(authenticationSpy).toHaveBeenNthCalledWith(1, {
      email: request.email,
      password: request.password
    })
  })

  test('should returns 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'authenticate')
      .mockImplementationOnce(async () => null)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(unauthorized())
  })

  test('should returns 500 if Authentication throws an error', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'authenticate').mockImplementationOnce(() => {
      throw new Error('any message')
    })

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error('any message')))
  })

  test('should returns 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationStubSpy = jest.spyOn(validationStub, 'validate')

    const request = mockRequest()

    await sut.handle(request)

    expect(validationStubSpy).toHaveBeenNthCalledWith(1, request)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('any_field')
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(error)

    const request = mockRequest()

    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(badRequest(error))
  })
})
