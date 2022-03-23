import { CompareFieldsValidation } from '../../../presentation/helpers/validations/compare-fields.validation'
import { EmailValidation } from '../../../presentation/helpers/validations/email.validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validations/required-field.validation'
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite.validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator.adapter'

export function makeSignUpValidation (): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new RequiredFieldValidation('passwordConfirmation'),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
    new EmailValidation('email', new EmailValidatorAdapter())
  ])
}
