import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveys } from '@/domain/usecases'
import { SurveyMongoRepository } from '@/infra/database/mongodb'

export function makeDbLoadSurveys (): LoadSurveys {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
