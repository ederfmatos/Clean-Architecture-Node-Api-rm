export interface AddSurveyRepository {
  add: (addSurveyParams: AddSurveyRepository.Params) => Promise<void>
}

export namespace AddSurveyRepository {
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
