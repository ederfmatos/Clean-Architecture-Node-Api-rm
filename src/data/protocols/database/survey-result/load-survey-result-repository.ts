import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string, account: string) => Promise<LoadSurveyResultRepository.Response>
}

export namespace LoadSurveyResultRepository {
  export type Response = SurveyResultModel
}
