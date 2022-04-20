import { SurveyModel } from '@/domain/models'

export interface LoadSurveysRepository {
  findAll: (accountId: string) => Promise<LoadSurveysRepository.Response[]>
}

export namespace LoadSurveysRepository {
  export type Response = SurveyModel
}
