
export interface LoadAccountByToken {
  loadAccountByToken: (token: string, role?: string) => Promise<LoadAccountByToken.Response>
}

export namespace LoadAccountByToken {
  export type Response = {
    id: string
  }
}
