import { badRequest, serverError, unauthorized, ok } from '../../../helpers/http/http.helper'
import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login.protocol'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = await this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }

      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.authenticate({ email, password })
      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
