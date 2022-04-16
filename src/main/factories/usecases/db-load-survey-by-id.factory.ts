import { DbLoadSurveyById } from '@/data/usecases/survey'
import { LoadSurveyById } from '@/domain/usecases/survey'
import { SurveyMongoRepository } from '@/infra/database/mongodb'

export function makeDbLoadSurveyById (): LoadSurveyById {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
