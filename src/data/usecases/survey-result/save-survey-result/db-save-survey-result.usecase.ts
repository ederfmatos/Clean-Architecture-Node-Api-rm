import { SaveSurveyResult, SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from './db-save-survey-result.protocol'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (SaveSurveyResultParams: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return this.saveSurveyResultRepository.save(SaveSurveyResultParams)
  }
}
