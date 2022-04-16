import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers'
import { makeDbLoadSurveys, makeLogControllerDecorator } from '@/main/factories'

export function makeLoadSurveysController (): Controller {
  const loadSurveys = makeDbLoadSurveys()
  const controller = new LoadSurveysController(loadSurveys)
  return makeLogControllerDecorator(controller)
}
