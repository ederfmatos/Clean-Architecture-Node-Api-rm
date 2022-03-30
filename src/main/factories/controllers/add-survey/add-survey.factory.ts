import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey.controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator.factory'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey.factory'
import { makeAddSurveyValidation } from './add-survey.validation'

export function makeAddSurveyController (): Controller {
  const addSurvey = makeDbAddSurvey()
  const validation = makeAddSurveyValidation()

  const controller = new AddSurveyController(validation, addSurvey)

  return makeLogControllerDecorator(controller)
}
