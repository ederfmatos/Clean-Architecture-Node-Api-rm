import { DbAddSurvey } from '@/data/usecases'
import { AddSurvey } from '@/domain/usecases'
import { SurveyMongoRepository } from '@/infra/database/mongodb'

export function makeDbAddSurvey (): AddSurvey {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
