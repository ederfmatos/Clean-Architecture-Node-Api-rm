import { Validation, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '../../../../presentation/helpers/validations'
import { ValidationComposite } from '../../../../presentation/helpers/validations/validation-composite.validation'
import { EmailValidator } from '../../../../presentation/protocols/email-validator.protocol'
import { makeSignUpValidation } from './signup.validation'

jest.mock('../../../../presentation/helpers/validations/validation-composite.validation')

function makeEmailValidator (): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)))
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
