import { SurveyResultModel } from '@/domain/models'

export interface SaveSurveyResult {
  save: (saveSurveyResultParams: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Response>
}

export namespace SaveSurveyResult {
  export type Params = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }

  export type Response = SurveyResultModel
}
