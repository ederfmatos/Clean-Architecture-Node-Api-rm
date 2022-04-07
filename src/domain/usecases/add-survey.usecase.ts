import { SurveyAnswer } from '@/domain/models/survey.model'

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export type AddSurvey = {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
