import { AddAccount, Authentication } from '@/domain/usecases'
import { SignUpController } from '@/presentation/controllers'
import { Validation } from '@/presentation/protocols'
import { serverError, forbidden, ok, badRequest } from '@/presentation/helpers'
import { InternalServerError, EmailInUseError, MissingParamError } from '@/presentation/errors'
import { mockValidation } from '@/tests/validation/mocks'
import { mockAddAccount, mockAuthentication } from '@/tests/presentation/mocks'

function mockRequest (): SignUpController.Request {
  return {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
}

type SutType = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

function makeSut (): SutType {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUp Controller', () => {
  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountStub, 'add')

    const request = mockRequest()

    await sut.handle(request)

    expect(addAccountSpy).toHaveBeenNthCalledWith(1, {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('should return 500 if AddAccount throws error', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(() => new Error('Any message'))

    const request = mockRequest()

    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })

  test('should returns 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockReturnValue(null)

    const request = mockRequest()

    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()

    const httpResponse = await sut.handle(request)

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

  test('should returns 500 if Authentication throws an error', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'authenticate').mockImplementationOnce(() => {
      throw new Error('any message')
    })

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error('any message')))
  })
})
