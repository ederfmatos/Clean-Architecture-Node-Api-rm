import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../protocols/email-validator.protocol'
import { EmailValidation } from './email.validation'

function makeEmailValidator (): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutType {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

function makeSut (): SutType {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const input = { email: 'any_email@mail.com' }

    sut.validate(input)

    expect(emailValidatorSpy).toHaveBeenNthCalledWith(1, input.email)
  })

  test('should throw error if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('Any message')
    })

    expect(sut.validate).toThrow()
  })

  test('should return an error if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const errorResponse = sut.validate({ email: 'any_email@mail.com' })

    expect(errorResponse).toEqual(new InvalidParamError('email'))
  })
})
