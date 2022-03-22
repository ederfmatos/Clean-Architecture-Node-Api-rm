import { EmailValidatorAdapter } from './email-validator.adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: (): boolean => true
}))

function makeSut (): EmailValidatorAdapter {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email')
    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = makeSut()
    const validatorSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(validatorSpy).toHaveBeenCalledTimes(1)
    expect(validatorSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
