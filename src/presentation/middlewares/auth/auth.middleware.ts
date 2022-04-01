import { HttpRequest, HttpResponse } from '../../protocols'
import { Middleware } from '../../protocols/middleware.protocol'
import { forbidden } from '../../helpers/http/http.helper'
import { AccessDeniedError } from '../../errors'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
