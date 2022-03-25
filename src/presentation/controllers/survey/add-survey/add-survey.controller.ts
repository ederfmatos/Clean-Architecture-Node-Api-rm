import { badRequest } from '../../../helpers/http/http.helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey.protocol'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = await this.validation.validate(httpRequest.body)
    if (validationError) {
      return badRequest(validationError)
    }

    return null
  }
}
