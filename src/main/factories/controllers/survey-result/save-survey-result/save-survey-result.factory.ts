import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result.controller'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id.factory'
import { makeDbSaveSurveyResultFactory } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result.factory'

export function makeSaveSurveyResultController (): Controller {
  const loadSurveyById = makeDbLoadSurveyById()
  const saveSurveyResult = makeDbSaveSurveyResultFactory()
  const controller = new SaveSurveyResultController(loadSurveyById, saveSurveyResult)

  return makeLogControllerDecorator(controller)
}
