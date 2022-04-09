import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey.usecase'
import { AddSurvey } from '@/domain/usecases/survey/add-survey.usecase'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey-repository/survey.repository'

export function makeDbAddSurvey (): AddSurvey {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
