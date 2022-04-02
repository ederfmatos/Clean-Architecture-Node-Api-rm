import { SurveyModel } from '../models/survey.model'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
