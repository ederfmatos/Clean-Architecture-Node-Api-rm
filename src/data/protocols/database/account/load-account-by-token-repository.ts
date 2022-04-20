export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<LoadAccountByTokenRepository.Response>
}

export namespace LoadAccountByTokenRepository {
  export type Response = {
    id: string
  }
}
