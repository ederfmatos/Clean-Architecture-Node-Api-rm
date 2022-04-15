import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers/http/http.helper'
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
      const authentication = await this.authentication.authenticate({ email, password })
      if (!authentication) {
        return unauthorized()
      }

      return ok(authentication)
    } catch (error) {
      return serverError(error)
    }
  }
}
