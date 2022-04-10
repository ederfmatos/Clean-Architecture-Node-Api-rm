import { SurveyModel } from '@/domain/models/survey.model'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export type AddSurvey = {
  add: (AddSurveyParams: AddSurveyParams) => Promise<void>
}
