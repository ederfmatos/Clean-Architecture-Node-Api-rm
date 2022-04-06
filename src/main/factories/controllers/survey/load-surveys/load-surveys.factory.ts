import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys.controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator.factory'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys.factory'

export function makeLoadSurveysController (): Controller {
  const loadSurveys = makeDbLoadSurveys()
  const controller = new LoadSurveysController(loadSurveys)
  return makeLogControllerDecorator(controller)
}
