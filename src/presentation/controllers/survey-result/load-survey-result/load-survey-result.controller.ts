import { forbidden } from '@/presentation/helpers/http/http.helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error.error'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result.protocol'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params

    const survey = await this.loadSurveyById.loadById(surveyId)
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }

    return null
  }
}
