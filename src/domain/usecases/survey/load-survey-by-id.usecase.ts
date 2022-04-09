import { SurveyModel } from '@/domain/models/survey.model'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}
