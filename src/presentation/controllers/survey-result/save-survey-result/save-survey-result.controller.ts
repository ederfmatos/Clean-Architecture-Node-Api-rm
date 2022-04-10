import { LoadSurveyById, Controller, HttpRequest, HttpResponse, InvalidParamError } from './save-survey-result.protocol'
import { forbidden, serverError } from '@/presentation/helpers/http/http.helper'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const answerIsInvalid = !survey.answers.some(item => item.answer === answer)
      if (answerIsInvalid) {
        return forbidden(new InvalidParamError('answer'))
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
