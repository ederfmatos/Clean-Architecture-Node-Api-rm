import { AddSurveyModel } from '../models/survey.model'

export interface AddSurvey {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
