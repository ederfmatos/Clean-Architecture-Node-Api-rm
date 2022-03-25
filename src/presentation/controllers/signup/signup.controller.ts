import { badRequest, serverError, ok } from '../../helpers/http/http.helper'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation, Authentication } from './signup.protocol'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = await this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }

      const { name, password, email } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      await this.authentication.authenticate({
        email: account.email,
        password: account.password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
