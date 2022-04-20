import { Authentication } from '@/domain/usecases'

export function mockAuthentication (): Authentication {
  class AuthenticationStub implements Authentication {
    async authenticate (authModel: Authentication.Params): Promise<Authentication.Response> {
      return {
        name: 'any_name',
        accessToken: 'any_token'
      }
    }
  }

  return new AuthenticationStub()
}
