import { DbAddSurvey } from '../../../../data/usecases/add-survey/db-add-survey.usecase'
import { SurveyMongoRepository } from '../../../../infra/database/mongodb/survey-repository/survey.repository'
import { AddSurvey } from '../../../../presentation/protocols'

export function makeDbAddSurvey (): AddSurvey {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
