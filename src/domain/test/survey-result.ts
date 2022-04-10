import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'

export function mockSurveyResultModel (): SurveyResultModel {
  return {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

export function mockSaveSurveyResultParams (): SaveSurveyResultParams {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}
