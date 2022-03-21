import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http.helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class SignUpController implements Controller {
  private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  constructor (private readonly emailValidator: EmailValidator) {}

  async handle ({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const missingField = this.requiredFields.find(field => !body[field])
      if (missingField) {
        return badRequest(new MissingParamError(missingField))
      }

      const { password, passwordConfirmation, email } = body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
