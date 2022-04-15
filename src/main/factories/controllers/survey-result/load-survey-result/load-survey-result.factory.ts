import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id.factory'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result.controller'
import { makeDbLoadSurveyResultFactory } from '@/main/factories/usecases/survey-result/load-survey-result/db-load-survey-result.factory'

export function makeLoadSurveyResultController (): Controller {
  const loadSurveyById = makeDbLoadSurveyById()
  const loadSurveyResult = makeDbLoadSurveyResultFactory()
  const controller = new LoadSurveyResultController(loadSurveyById, loadSurveyResult)

  return makeLogControllerDecorator(controller)
}
