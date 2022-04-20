import { SurveyModel } from '@/domain/models'
import { AddSurvey } from '@/domain/usecases'

export function mockAddSurveyParams (): AddSurvey.Params {
  return {
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
        image: 'any_images'
      }
    ],
    date: new Date()
  }
}

export function mockSurveyModel (question = 'any_question'): SurveyModel {
  return {
    id: 'any_id',
    question,
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date(),
    didAnswer: false
  }
}

export function mockSurveysModel (): SurveyModel[] {
  return [mockSurveyModel(), mockSurveyModel()]
}
