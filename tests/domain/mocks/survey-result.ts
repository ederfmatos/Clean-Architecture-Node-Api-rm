import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResultParams } from '@/domain/usecases'

export function mockSurveyResultModel (): SurveyResultModel {
  return {
    surveyId: 'any_survey_id',
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
        count: 10,
        percent: 25,
        image: 'any_image',
        isCurrentAccountAnswer: false
      },
      {
        answer: 'other_answer',
        count: 30,
        percent: 75,
        image: 'any_image',
        isCurrentAccountAnswer: false
      }
    ],
    date: new Date()
  }
}

export function mockEmptySurveyResultModel (): SurveyResultModel {
  return {
    surveyId: 'any_id',
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
        count: 0,
        percent: 0,
        image: 'any_image',
        isCurrentAccountAnswer: false
      }
    ],
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
