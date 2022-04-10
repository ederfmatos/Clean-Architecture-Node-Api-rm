import { SurveyModel } from '@/domain/models/survey.model'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey.usecase'

export function mockAddSurveyParams (): AddSurveyParams {
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
    date: new Date()
  }
}

export function mockSurveysModel (): SurveyModel[] {
  return [mockSurveyModel(), mockSurveyModel()]
}
