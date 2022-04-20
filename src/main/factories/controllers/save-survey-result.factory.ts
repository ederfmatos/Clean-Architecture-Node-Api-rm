import { Controller } from '@/presentation/protocols'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { makeLogControllerDecorator, makeDbLoadAnswersBySurvey, makeDbSaveSurveyResultFactory } from '@/main/factories'

export function makeSaveSurveyResultController (): Controller {
  const loadSurveyById = makeDbLoadAnswersBySurvey()
  const saveSurveyResult = makeDbSaveSurveyResultFactory()
  const controller = new SaveSurveyResultController(loadSurveyById, saveSurveyResult)

  return makeLogControllerDecorator(controller)
}
