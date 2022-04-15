import { LoadSurveyResult, LoadSurveyResultRepository, SurveyResultModel } from './db-load-survey-result.protocol'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    return this.loadSurveyResultRepository.loadBySurveyId(surveyId)
  }
}
