import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http.helper'
import { Validation } from '../signup/signup.protocol'
import { LoginController } from './login.controller'
import { Authentication, HttpRequest } from './login.protocol'

interface SutType {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

function makeSut (): SutType {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidationStub()
  const sut = new LoginController(authenticationStub, validationStub)
  return { sut, authenticationStub, validationStub }
}

function makeAuthentication (): Authentication {
  class AuthenticationStub implements Authentication {
    async authenticate (email: string, password: string): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

function makeFakeRequest (): HttpRequest {
  return {
    body: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  }
}

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

describe('Login Controller', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authenticationSpy = jest.spyOn(authenticationStub, 'authenticate')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(authenticationSpy).toHaveBeenNthCalledWith(1, httpRequest.body.email, httpRequest.body.password)
  })

  test('should returns 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'authenticate')
      .mockImplementationOnce(async () => null)

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(unauthorized())
  })

  test('should returns 500 if Authentication throws an error', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'authenticate').mockImplementationOnce(() => {
      throw new Error('any message')
    })

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error('any message')))
  })

  test('should returns 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationStubSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(validationStubSpy).toHaveBeenNthCalledWith(1, httpRequest.body)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('any_field')
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(error)

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(error))
  })
})
