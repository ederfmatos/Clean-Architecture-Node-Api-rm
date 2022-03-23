import { InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http.helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse, AddAccount, Validation } from './signup.protocol'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle ({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = await this.validation.validate(body)
      if (validationError) {
        return badRequest(validationError)
      }

      const { name, password, email } = body

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
