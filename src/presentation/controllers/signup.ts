import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
