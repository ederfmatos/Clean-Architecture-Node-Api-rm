export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Response>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
    accessToken?: string
  }
  export type Response = boolean
}
