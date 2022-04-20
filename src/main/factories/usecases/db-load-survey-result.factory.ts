import { DbLoadSurveyResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyMongoRepository, SurveyResultMongoRepository } from '@/infra/database/mongodb'

export function makeDbLoadSurveyResultFactory (): LoadSurveyResult {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
