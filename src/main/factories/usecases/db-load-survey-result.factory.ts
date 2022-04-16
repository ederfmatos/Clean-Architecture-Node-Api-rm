import { DbLoadSurveyResult } from '@/data/usecases/survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result'
import { SurveyMongoRepository, SurveyResultMongoRepository } from '@/infra/database/mongodb'

export function makeDbLoadSurveyResultFactory (): LoadSurveyResult {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
