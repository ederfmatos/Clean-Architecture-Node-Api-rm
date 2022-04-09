export type AuthenticationModel = {
  email: string
  password: string
}

export type Authentication = {
  authenticate: (authModel: AuthenticationModel) => Promise<string>
}
