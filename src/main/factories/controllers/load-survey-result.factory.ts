import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeDbLoadSurveyById, makeDbLoadSurveyResultFactory } from '@/main/factories'
import { LoadSurveyResultController } from '@/presentation/controllers'

export function makeLoadSurveyResultController (): Controller {
  const loadSurveyById = makeDbLoadSurveyById()
  const loadSurveyResult = makeDbLoadSurveyResultFactory()
  const controller = new LoadSurveyResultController(loadSurveyById, loadSurveyResult)

  return makeLogControllerDecorator(controller)
}
