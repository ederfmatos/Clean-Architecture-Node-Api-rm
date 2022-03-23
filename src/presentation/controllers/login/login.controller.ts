import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http.helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly requiredFields = ['email', 'password']
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const missingField = this.requiredFields.find(field => !httpRequest.body[field])
    if (missingField) {
      return badRequest(new MissingParamError(missingField))
    }
  }
}
