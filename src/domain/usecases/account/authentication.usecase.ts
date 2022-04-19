import { AuthenticationModel } from '@/domain/models'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  authenticate: (authModel: AuthenticationParams) => Promise<AuthenticationModel>
}
