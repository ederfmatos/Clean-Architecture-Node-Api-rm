import { LoadSurveyById, Controller, HttpRequest, HttpResponse, InvalidParamError } from './save-survey-result.protocol'
import { forbidden, serverError } from '@/presentation/helpers/http/http.helper'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
