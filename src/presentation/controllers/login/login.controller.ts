import { Authentication } from '../../../domain/usecases/authentication.usecase'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http.helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup.protocol'

export class LoginController implements Controller {
  private readonly requiredFields = ['email', 'password']

  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const missingField = this.requiredFields.find(field => !httpRequest.body[field])
      if (missingField) {
        return badRequest(new MissingParamError(missingField))
      }

      const { email, password } = httpRequest.body

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication.authenticate(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
