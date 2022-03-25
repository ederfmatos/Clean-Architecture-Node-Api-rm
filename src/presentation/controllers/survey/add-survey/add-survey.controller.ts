import { badRequest } from '../../../helpers/http/http.helper'
import { Controller, HttpRequest, HttpResponse, Validation, AddSurvey } from './add-survey.protocol'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = await this.validation.validate(httpRequest.body)
    if (validationError) {
      return badRequest(validationError)
    }

    await this.addSurvey.add({
      question: httpRequest.body.question,
      answers: httpRequest.body.answers
    })

    return null
  }
}
