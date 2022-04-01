import { forbidden, ok, serverError } from '../../helpers/http/http.helper'
import { AccessDeniedError } from '../../errors'
import { LoadAccountByToken, Middleware, HttpRequest, HttpResponse, AccountModel } from './auth-middleware.protocol'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['x-access-token']
      if (!accessToken) {
        return forbidden(new AccessDeniedError())
      }

      const account: AccountModel = await this.loadAccountByToken.loadAccountByToken(accessToken, this.role)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }

      return ok({ account: { id: account.id } })
    } catch (error) {
      return serverError(error)
    }
  }
}
