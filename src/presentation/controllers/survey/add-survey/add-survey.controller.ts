import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey.protocol'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body)
    return null
  }
}
