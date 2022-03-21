import { MissingParamError } from '../errors/missing-param-error.error'
import { badRequest } from '../helpers/http.helper'
import { HttpRequest, HttpResponse } from '../protocols/http.protocol'

export class SignUpController {
  private readonly requiredFields = ['name', 'email']

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const missingField = this.requiredFields.find(field => !httpRequest.body[field])
    if (missingField) {
      return badRequest(new MissingParamError(missingField))
    }
  }
}
