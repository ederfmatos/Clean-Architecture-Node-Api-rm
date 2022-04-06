import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys.usecase'
import { LoadSurveys } from '../../../../../domain/usecases/load-surveys.usecase'
import { SurveyMongoRepository } from '../../../../../infra/database/mongodb/survey-repository/survey.repository'

export function makeDbLoadSurveys (): LoadSurveys {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
