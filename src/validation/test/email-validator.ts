import { EmailValidator } from '@/validation/protocols/email-validator.protocol'

export function mockEmailValidator (): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
