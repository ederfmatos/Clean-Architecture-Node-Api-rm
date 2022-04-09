import { LoadSurveyById, Controller, HttpRequest, HttpResponse, InvalidParamError } from './save-survey-result.protocol'
import { forbidden } from '@/presentation/helpers/http/http.helper'

export class SaveSurveyResultController implements Controller {
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
