import { EmailValidator } from '../presentation/protocols/email-validator.protocol'
import { EmailValidatorAdapter } from './email-validator.adapter'

interface SutType {
  sut: EmailValidator
}

function makeSut (): SutType {
  const sut = new EmailValidatorAdapter()

  return {
    sut
  }
}

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('invalid_email')
    expect(isValid).toBe(false)
  })
})
