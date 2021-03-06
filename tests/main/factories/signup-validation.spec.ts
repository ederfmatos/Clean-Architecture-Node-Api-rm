import { Validation } from '@/presentation/protocols'
import { mockEmailValidator } from '@/tests/validation/mocks'
import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from '@/validation/validations'
import { makeSignUpValidation } from '@/main/factories'

jest.mock('@/validation/validations/validation-composite.validation')

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)))
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
