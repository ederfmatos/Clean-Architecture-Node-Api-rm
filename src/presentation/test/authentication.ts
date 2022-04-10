import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication.usecase'

export function mockAuthentication (): Authentication {
  class AuthenticationStub implements Authentication {
    async authenticate (authModel: AuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}
