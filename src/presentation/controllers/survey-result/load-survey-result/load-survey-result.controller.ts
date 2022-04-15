import { Controller, HttpRequest, HttpResponse, LoadSurveyById, LoadSurveyResult } from './load-survey-result.protocol'
import { forbidden, serverError } from '@/presentation/helpers/http/http.helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error.error'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      await this.loadSurveyResult.load(survey.id)

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
