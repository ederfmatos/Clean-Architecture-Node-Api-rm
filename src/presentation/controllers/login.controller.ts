import { Authentication } from '@/domain/usecases'
import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers'
import { Controller, Validation, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const validationError = await this.validation.validate(request)
      if (validationError) {
        return badRequest(validationError)
      }

      const { email, password } = request
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

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
