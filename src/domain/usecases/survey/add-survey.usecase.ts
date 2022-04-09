import { SurveyModel } from '@/domain/models/survey.model'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export type AddSurvey = {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
