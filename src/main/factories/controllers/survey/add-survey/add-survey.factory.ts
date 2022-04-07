import { makeAddSurveyValidation } from './add-survey.validation'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey.controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey.factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'

export function makeAddSurveyController (): Controller {
  const addSurvey = makeDbAddSurvey()
  const validation = makeAddSurveyValidation()

  const controller = new AddSurveyController(validation, addSurvey)

  return makeLogControllerDecorator(controller)
}
