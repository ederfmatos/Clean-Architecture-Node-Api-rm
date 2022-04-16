import { AddSurveyParams } from '@/domain/usecases'

export interface AddSurveyRepository {
  add: (AddSurveyParams: AddSurveyParams) => Promise<void>
}
