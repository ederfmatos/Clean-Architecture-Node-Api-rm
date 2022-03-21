import { InvalidParamError } from '../errors/invalid-param-error.error'
import { MissingParamError } from '../errors/missing-param-error.error'
import { badRequest } from '../helpers/http.helper'
import { Controller } from '../protocols/controller.protocol'
import { EmailValidator } from '../protocols/email-validator.protocol'
import { HttpRequest, HttpResponse } from '../protocols/http.protocol'

export class SignUpController implements Controller {
  private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const missingField = this.requiredFields.find(field => !httpRequest.body[field])
    if (missingField) {
      return badRequest(new MissingParamError(missingField))
    }

    const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
