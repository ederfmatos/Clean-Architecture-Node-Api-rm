import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadAnswersBySurvey } from '@/domain/usecases'
import { SurveyMongoRepository } from '@/infra/database/mongodb'

export function makeDbLoadAnswersBySurvey (): LoadAnswersBySurvey {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
