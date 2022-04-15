import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result.usecase'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result.usecase'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey-repository/survey.repository'
import { SurveyResultMongoRepository } from '@/infra/database/mongodb/survey-result/survey-result.repository'

export function makeDbLoadSurveyResultFactory (): LoadSurveyResult {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
