import { AddSurveyModel } from '../../../../presentation/protocols'

export interface AddSurveyRepository {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
