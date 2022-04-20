import { LoadAnswersBySurvey, SaveSurveyResult } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, answer, accountId } = request

      const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId)
      if (!answers?.length) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const answerIsInvalid = !answers.includes(answer)
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

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    answer: string
    accountId: string
  }
}
