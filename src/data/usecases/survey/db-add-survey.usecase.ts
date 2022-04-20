import { AddSurveyRepository } from '@/data/protocols'
import { AddSurvey } from '@/domain/usecases'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (addSurveyParams: AddSurvey.Params): Promise<void> {
    return this.addSurveyRepository.add(addSurveyParams)
  }
}
