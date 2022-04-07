import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys.controller'
import { Controller } from '@/presentation/protocols'
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys.factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'

export function makeLoadSurveysController (): Controller {
  const loadSurveys = makeDbLoadSurveys()
  const controller = new LoadSurveysController(loadSurveys)
  return makeLogControllerDecorator(controller)
}
