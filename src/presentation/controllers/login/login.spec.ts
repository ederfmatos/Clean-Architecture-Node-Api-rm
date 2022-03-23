import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http.helper'
import { HttpRequest } from '../../protocols'
import { EmailValidator } from '../signup/signup.protocol'
import { LoginController } from './login.controller'

interface SutType {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

function makeSut (): SutType {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)
  return { sut, emailValidatorStub }
}

function makeEmailValidator (): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

function makeFakeRequest (): HttpRequest {
  return {
    body: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  }
}

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
})
