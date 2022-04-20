import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeDbLoadSurveyResultFactory, makeDbExistsSurveyById } from '@/main/factories'
import { LoadSurveyResultController } from '@/presentation/controllers'

export function makeLoadSurveyResultController (): Controller {
  const existsSurveyById = makeDbExistsSurveyById()
  const loadSurveyResult = makeDbLoadSurveyResultFactory()
  const controller = new LoadSurveyResultController(existsSurveyById, loadSurveyResult)

  return makeLogControllerDecorator(controller)
}
