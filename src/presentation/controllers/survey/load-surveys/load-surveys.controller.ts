import { serverError } from '../../../helpers/http/http.helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys.protocol'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadSurveys.load()
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
