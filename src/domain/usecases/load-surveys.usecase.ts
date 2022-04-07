import { SurveyModel } from '@/domain/models/survey.model'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
