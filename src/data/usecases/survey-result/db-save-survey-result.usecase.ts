import { SaveSurveyResultRepository, LoadSurveyResultRepository } from '@/data/protocols'
import { SaveSurveyResult } from '@/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (saveSurveyResultParams: SaveSurveyResult.Params): Promise<SaveSurveyResult.Response> {
    await this.saveSurveyResultRepository.save(saveSurveyResultParams)
    return this.loadSurveyResultRepository.loadBySurveyId(saveSurveyResultParams.surveyId, saveSurveyResultParams.accountId)
  }
}
