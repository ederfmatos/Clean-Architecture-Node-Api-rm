import { Validation } from '../../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validations'
import { makeAddSurveyValidation } from './add-survey.validation'

jest.mock('../../../../../validation/validations/validation-composite.validation')

describe('AddSurveyValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()

    const validations: Validation[] = []
    const requiredFields = ['question', 'answers']
    requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
