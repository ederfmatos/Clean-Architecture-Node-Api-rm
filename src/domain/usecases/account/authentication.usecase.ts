import { AuthenticationModel } from '@/domain/models/authentication'

export type AuthenticationParams = {
  email: string
  password: string
}

export type Authentication = {
  authenticate: (authModel: AuthenticationParams) => Promise<AuthenticationModel>
}
