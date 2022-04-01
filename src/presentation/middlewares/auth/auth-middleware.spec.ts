import { forbidden, ok } from '../../helpers/http/http.helper'
import { AccessDeniedError } from '../../errors'
import { AuthMiddleware } from './auth.middleware'
import { AccountModel, HttpRequest, LoadAccountByToken } from './auth-middleware.protocol'

interface SutType {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

function makeFakeAccount (): AccountModel {
  return {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password'
  }
}

function makeLoadAccountByToken (): LoadAccountByToken {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async loadAccountByToken (token: string, role?: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }

  return new LoadAccountByTokenStub()
}

function makeSut (): SutType {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

  return { sut, loadAccountByTokenStub }
}

function makeFakeRequest (): HttpRequest {
  return {
    headers: {
      'x-access-token': 'any_token'
    }
  }
}

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token header exists in request', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({ headers: {} })

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call LoadAccountByToken with correct access token', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'loadAccountByToken')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(loadSpy).toHaveBeenNthCalledWith(1, httpRequest.headers['x-access-token'])
  })

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'loadAccountByToken').mockReturnValue(null)

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 200 if LoadAccountByToken succeds', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok({ account: { id: 'valid_id' } }))
  })
})