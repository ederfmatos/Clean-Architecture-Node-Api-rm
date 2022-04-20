export interface SaveSurveyResultRepository {
  save: (saveSurveyResultParams: SaveSurveyResultRepository.Params) => Promise<void>
}
export namespace SaveSurveyResultRepository {
  export type Params = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }
}
