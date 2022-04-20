import { SurveyModel } from '@/domain/models'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<LoadSurveyByIdRepository.Response>
}

export namespace LoadSurveyByIdRepository {
  export type Response = SurveyModel
}
