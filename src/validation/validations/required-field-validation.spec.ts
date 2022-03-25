import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field.validation'

describe('RequireField Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ anyField: '' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should not return if validation succeds', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
