import { Controller, HttpRequest, HttpResponse } from '../../auth/login/login.protocol'
import { LoadSurveyById } from './save-survey-result.protocol'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params
    await this.loadSurveyById.loadById(surveyId)
    return null
  }
}
