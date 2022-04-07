import { AddSurveyModel } from '@/data/usecases/add-survey/db-add-survey.protocol'

export interface AddSurveyRepository {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
