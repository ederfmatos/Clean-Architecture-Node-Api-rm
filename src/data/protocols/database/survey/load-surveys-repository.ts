import { SurveyModel } from '@/domain/models'

export interface LoadSurveysRepository {
  findAll: (accountId: string) => Promise<SurveyModel[]>
}
