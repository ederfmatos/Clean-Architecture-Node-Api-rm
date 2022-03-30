import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validations'

export function makeAddSurveyValidation (): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('question'),
    new RequiredFieldValidation('answers')
  ])
}
