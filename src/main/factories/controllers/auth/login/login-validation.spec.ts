import { mockEmailValidator } from '@/validation/test'
import { Validation, RequiredFieldValidation, EmailValidation, ValidationComposite } from '@/validation/validations'
import { makeLoginValidation } from './login.validation'

jest.mock('@/validation/validations/validation-composite.validation')

describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []
    const requiredFields = ['email', 'password']
    requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)))
    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
