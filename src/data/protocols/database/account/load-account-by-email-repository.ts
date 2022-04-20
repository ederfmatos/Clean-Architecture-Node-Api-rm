export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadAccountByEmailRepository.Response>
}

export namespace LoadAccountByEmailRepository {
  export type Response = {
    id: string
    name: string
    password: string
  }
}
