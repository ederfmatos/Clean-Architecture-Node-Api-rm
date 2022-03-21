import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http.helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse, AddAccount } from './signup.protocol'

export class SignUpController implements Controller {
  private readonly requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle ({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const missingField = this.requiredFields.find(field => !body[field])
      if (missingField) {
        return badRequest(new MissingParamError(missingField))
      }

      const { name, password, passwordConfirmation, email } = body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
