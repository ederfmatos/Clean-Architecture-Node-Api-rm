import { Controller } from '@/presentation/protocols'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { makeLogControllerDecorator, makeDbLoadSurveyById, makeDbSaveSurveyResultFactory } from '@/main/factories'

export function makeSaveSurveyResultController (): Controller {
  const loadSurveyById = makeDbLoadSurveyById()
  const saveSurveyResult = makeDbSaveSurveyResultFactory()
  const controller = new SaveSurveyResultController(loadSurveyById, saveSurveyResult)

  return makeLogControllerDecorator(controller)
}
