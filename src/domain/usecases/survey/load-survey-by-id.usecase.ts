import { SurveyModel } from '@/domain/models'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<LoadSurveyById.Response>
}

export namespace LoadSurveyById {
  export type Response = SurveyModel
}
