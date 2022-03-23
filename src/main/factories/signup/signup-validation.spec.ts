import { RequiredFieldValidation } from '../../../presentation/helpers/validations/required-field.validation'
import { Validation } from '../../../presentation/helpers/validations/validation'
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite.validation'
import { makeSignUpValidation } from './signup.validation'

jest.mock('../../../presentation/helpers/validations/validation-composite.validation')

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
