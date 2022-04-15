import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result.usecase'
import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result.usecase'
import { SurveyResultMongoRepository } from '@/infra/database/mongodb/survey-result/survey-result.repository'

export function makeDbSaveSurveyResultFactory (): SaveSurveyResult {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
