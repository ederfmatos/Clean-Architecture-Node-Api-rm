import { DbLoadSurveyById } from '@/data/usecases/survey/load-surveys-by-id/db-load-survey-by-id.usecase'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id.usecase'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey-repository/survey.repository'

export function makeDbLoadSurveyById (): LoadSurveyById {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
