import { LoadSurveyById, Controller, HttpRequest, HttpResponse, InvalidParamError, SaveSurveyResult } from './save-survey-result.protocol'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http.helper'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { id: accountId } = httpRequest.account

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const answerIsInvalid = !survey.answers.some(item => item.answer === answer)
      if (answerIsInvalid) {
        return forbidden(new InvalidParamError('answer'))
      }

      const surveyResultModel = await this.saveSurveyResult.save({
        answer,
        surveyId,
        accountId,
        date: new Date()
      })

      return ok(surveyResultModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
