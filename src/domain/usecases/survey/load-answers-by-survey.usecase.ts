export interface LoadAnswersBySurvey {
  loadAnswers: (id: string) => Promise<LoadAnswersBySurvey.Response>
}

export namespace LoadAnswersBySurvey {
  export type Response = string[]
}
