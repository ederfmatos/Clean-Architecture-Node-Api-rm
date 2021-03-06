import { AccessDeniedError, InternalServerError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AuthMiddleware } from '@/presentation/middlewares'
import { LoadAccountByToken } from '@/domain/usecases'
import { mockLoadAccountByToken } from '@/tests/presentation/mocks'

type SutType = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

function makeSut (role?: string): SutType {
  const loadAccountByTokenStub = mockLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)

  return { sut, loadAccountByTokenStub }
}

function mockRequest (): AuthMiddleware.Request {
  return {
    accessToken: 'any_token'
  }
}

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token header exists in request', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({ })

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call LoadAccountByToken with correct access token', async () => {
    const role = 'any-role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'loadAccountByToken')
    const request = mockRequest()

    await sut.handle(request)

    expect(loadSpy).toHaveBeenNthCalledWith(1, request.accessToken, role)
  })

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'loadAccountByToken').mockReturnValue(null)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 200 if LoadAccountByToken succeds', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok({ account: { id: 'any_id' } }))
  })

  test('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'loadAccountByToken').mockRejectedValue(new InternalServerError())

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })
})
