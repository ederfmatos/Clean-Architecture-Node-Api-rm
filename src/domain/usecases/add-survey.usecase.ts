import { SurveyAnswer } from '../models/survey.model'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface AddSurvey {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
