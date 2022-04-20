export interface LoadAnswersBySurveyRepository {
  loadAnswers: (id: string) => Promise<LoadAnswersBySurveyRepository.Response>
}

export namespace LoadAnswersBySurveyRepository {
  export type Response = string[]
}
