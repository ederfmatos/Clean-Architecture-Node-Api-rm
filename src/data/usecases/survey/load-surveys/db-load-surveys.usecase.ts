import { LoadSurveys, LoadSurveysRepository, SurveyModel } from './db-load-surveys.protocol'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.findAll(accountId)
  }
}
