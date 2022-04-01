import { forbidden } from '../../helpers/http/http.helper'
import { AccessDeniedError } from '../../errors'
import { AuthMiddleware } from './auth.middleware'

interface SutType {
  sut: AuthMiddleware
}

function makeSut (): SutType {
  const sut = new AuthMiddleware()

  return { sut }
}

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token header exists in request', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({ headers: {} })

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
