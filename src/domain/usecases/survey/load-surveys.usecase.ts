import { SurveyModel } from '@/domain/models'

export interface LoadSurveys {
  load: (accountId: string) => Promise<LoadSurveys.Response[]>
}

export namespace LoadSurveys {
  export type Response = SurveyModel
}
