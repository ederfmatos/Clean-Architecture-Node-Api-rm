export interface ExistsSurveyByIdRepository {
  existsById: (id: string) => Promise<ExistsSurveyByIdRepository.Response>
}

export namespace ExistsSurveyByIdRepository {
  export type Response = boolean
}
