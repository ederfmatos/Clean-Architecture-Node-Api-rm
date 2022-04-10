import { Validation } from '@/presentation/protocols/validation'

export function mockValidation (): Validation {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
