import { EmailValidator } from '@/validation/protocols/email-validator.protocol'
import { Validation, RequiredFieldValidation, EmailValidation, ValidationComposite } from '@/validation/validations'
import { makeLoginValidation } from './login.validation'

jest.mock('@/validation/validations/validation-composite.validation')

function makeEmailValidator (): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []
    const requiredFields = ['email', 'password']
    requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
