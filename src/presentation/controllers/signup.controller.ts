import { MissingParamError } from '../errors/missing-param-error.error'
import { badRequest } from '../helpers/http.helper'
import { Controller } from '../protocols/controller.protocol'
import { HttpRequest, HttpResponse } from '../protocols/http.protocol'

export class SignUpController implements Controller {
  private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const missingField = this.requiredFields.find(field => !httpRequest.body[field])
    if (missingField) {
      return badRequest(new MissingParamError(missingField))
    }
  }
}
