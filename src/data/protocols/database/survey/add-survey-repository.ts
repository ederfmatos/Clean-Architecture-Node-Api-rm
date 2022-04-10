import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey.protocol'

export interface AddSurveyRepository {
  add: (AddSurveyParams: AddSurveyParams) => Promise<void>
}
