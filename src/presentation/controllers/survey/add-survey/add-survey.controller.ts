import { Controller, HttpRequest, HttpResponse, Validation, AddSurvey } from './add-survey.protocol'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http.helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = await this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }

      await this.addSurvey.add({
        question: httpRequest.body.question,
        answers: httpRequest.body.answers,
        date: new Date()
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
