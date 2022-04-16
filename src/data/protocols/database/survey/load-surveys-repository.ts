import { SurveyModel } from '@/domain/models'

export type Survey = SurveyModel

export interface LoadSurveysRepository {
  findAll: (accountId: string) => Promise<Survey[]>
}
