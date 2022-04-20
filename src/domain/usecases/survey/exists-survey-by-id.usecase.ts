export interface ExistsSurveyById {
  existsById: (id: string) => Promise<ExistsSurveyById.Response>
}

export namespace ExistsSurveyById {
  export type Response = boolean
}
