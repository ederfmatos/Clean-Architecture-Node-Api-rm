import { SurveyModel } from '@/domain/models/survey.model'

export interface LoadSurveys {
  load: (accountId: string) => Promise<SurveyModel[]>
}
