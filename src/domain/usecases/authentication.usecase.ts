export interface AuthenticationModel {
  email: string
  password: string
}

export interface Authentication {
  authenticate: (authModel: AuthenticationModel) => Promise<string>
}
