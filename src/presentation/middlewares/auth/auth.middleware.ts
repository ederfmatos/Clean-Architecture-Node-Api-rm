import { forbidden } from '../../helpers/http/http.helper'
import { AccessDeniedError } from '../../errors'
import { LoadAccountByToken, Middleware, HttpRequest, HttpResponse } from './auth-middleware.protocol'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers['x-access-token']
    if (!accessToken) {
      return forbidden(new AccessDeniedError())
    }

    await this.loadAccountByToken.loadAccountByToken(accessToken)
  }
}
