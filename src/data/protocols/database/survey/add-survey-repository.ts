import { AddSurveyParams } from '@/domain/usecases'

export type AddSurveyModel = AddSurveyParams

export interface AddSurveyRepository {
  add: (AddSurveyParams: AddSurveyModel) => Promise<void>
}
