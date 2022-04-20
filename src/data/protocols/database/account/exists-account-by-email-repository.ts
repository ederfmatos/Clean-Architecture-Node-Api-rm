export interface ExistsAccountByEmailRepository {
  existsByEmail: (email: string) => Promise<ExistsAccountByEmailRepository.Response>
}

export namespace ExistsAccountByEmailRepository {
  export type Response = boolean
}
