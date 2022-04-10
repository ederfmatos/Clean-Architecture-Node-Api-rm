import { AddSurvey, AddSurveyParams, AddSurveyRepository } from './db-add-survey.protocol'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (AddSurveyParams: AddSurveyParams): Promise<void> {
    return this.addSurveyRepository.add(AddSurveyParams)
  }
}
