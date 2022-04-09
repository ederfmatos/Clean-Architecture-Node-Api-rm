import { AddSurveyModel } from '@/data/usecases/survey/add-survey/db-add-survey.protocol'

export interface AddSurveyRepository {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
