import { HttpRequest, HttpResponse } from '../../protocols'
import { Middleware } from '../../protocols/middleware.protocol'
import { forbidden } from '../../helpers/http/http.helper'
import { AccessDeniedError } from '../../errors'
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token.usecase'

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
