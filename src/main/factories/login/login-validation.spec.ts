import { Validation, RequiredFieldValidation, EmailValidation } from '../../../presentation/helpers/validations'
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite.validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator.protocol'
import { makeLoginValidation } from './login.validation'

jest.mock('../../../presentation/helpers/validations/validation-composite.validation')

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
