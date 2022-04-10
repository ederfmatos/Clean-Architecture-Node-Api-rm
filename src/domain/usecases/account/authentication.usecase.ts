export type AuthenticationParams = {
  email: string
  password: string
}

export type Authentication = {
  authenticate: (authModel: AuthenticationParams) => Promise<string>
}
