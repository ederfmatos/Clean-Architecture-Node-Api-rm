import { AddSurvey, AddSurveyModel, AddSurveyRepository } from './db-add-survey.protocol'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (addSurveyModel: AddSurveyModel): Promise<void> {
    return this.addSurveyRepository.add(addSurveyModel)
  }
}
