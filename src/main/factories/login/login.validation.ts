import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../presentation/helpers/validations'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator/email-validator.adapter'

export function makeLoginValidation (): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', new EmailValidatorAdapter())
  ])
}
