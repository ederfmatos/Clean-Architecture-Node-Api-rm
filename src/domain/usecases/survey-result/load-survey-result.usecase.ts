import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResult {
  load: (surveyId: string, accountId: string) => Promise<LoadSurveyResult.Response>
}

export namespace LoadSurveyResult {
  export type Response = SurveyResultModel
}
