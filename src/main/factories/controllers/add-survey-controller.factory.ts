import { makeAddSurveyValidation } from '@/main/factories/validation'
import { AddSurveyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAddSurvey, makeLogControllerDecorator } from '@/main/factories'

export function makeAddSurveyController (): Controller {
  const addSurvey = makeDbAddSurvey()
  const validation = makeAddSurveyValidation()

  const controller = new AddSurveyController(validation, addSurvey)

  return makeLogControllerDecorator(controller)
}
