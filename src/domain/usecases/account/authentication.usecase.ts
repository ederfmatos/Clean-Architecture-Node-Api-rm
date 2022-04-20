export interface Authentication {
  authenticate: (authModel: Authentication.Params) => Promise<Authentication.Response>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Response = {
    name: string
    accessToken?: string
  }
}
