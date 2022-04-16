import { SurveyModel } from '@/domain/models'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export type AddSurvey = {
  add: (AddSurveyParams: AddSurveyParams) => Promise<void>
}
