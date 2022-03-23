import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http.helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup.protocol'

export class LoginController implements Controller {
  private readonly requiredFields = ['email', 'password']

  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const missingField = this.requiredFields.find(field => !httpRequest.body[field])
    if (missingField) {
      return badRequest(new MissingParamError(missingField))
    }

    const { email } = httpRequest.body

    const isValidEmail = this.emailValidator.isValid(email)
    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
