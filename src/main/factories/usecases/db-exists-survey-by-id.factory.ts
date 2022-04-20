import { DbExistsSurveyById } from '@/data/usecases'
import { ExistsSurveyById } from '@/domain/usecases'
import { SurveyMongoRepository } from '@/infra/database/mongodb'

export function makeDbExistsSurveyById (): ExistsSurveyById {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbExistsSurveyById(surveyMongoRepository)
}
