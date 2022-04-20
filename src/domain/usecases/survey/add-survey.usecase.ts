export interface AddSurvey {
  add: (addSurveyParams: AddSurvey.Params) => Promise<void>
}

export namespace AddSurvey {
  export type Params = {
    question: string
    answers: SurveyAnswer[]
    date: Date
    didAnswer?: boolean
  }

  type SurveyAnswer = {
    image?: string
    answer: string
  }
}
