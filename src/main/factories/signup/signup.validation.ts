import { RequiredFieldValidation } from '../../../presentation/helpers/validations/required-field.validation'
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite.validation'

export function makeSignUpValidation (): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new RequiredFieldValidation('passwordConfirmation')
  ])
}
