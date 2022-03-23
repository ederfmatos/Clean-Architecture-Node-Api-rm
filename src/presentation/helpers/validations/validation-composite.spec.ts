import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite.validation'

interface SutType {
  sut: ValidationComposite
  validation: Validation
}

function makeValidation (): Validation {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

function makeSut (): SutType {
  const validation = makeValidation()
  const sut = new ValidationComposite([validation])
  return {
    sut,
    validation
  }
}

describe('Validation Composite', () => {
  test('should return an erro if any validation fails', () => {
    const { sut, validation } = makeSut()
    jest.spyOn(validation, 'validate').mockReturnValue(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
