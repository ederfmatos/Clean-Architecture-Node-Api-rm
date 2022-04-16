import { AuthenticationModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

export function mockAuthentication (): Authentication {
  class AuthenticationStub implements Authentication {
    async authenticate (authModel: AuthenticationParams): Promise<AuthenticationModel> {
      return {
        name: 'any_name',
        accessToken: 'any_token'
      }
    }
  }

  return new AuthenticationStub()
}
