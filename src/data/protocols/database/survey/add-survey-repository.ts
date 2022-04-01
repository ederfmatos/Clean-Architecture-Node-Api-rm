import { AddSurveyModel } from '../../../usecases/add-survey/db-add-survey.protocol'

export interface AddSurveyRepository {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
