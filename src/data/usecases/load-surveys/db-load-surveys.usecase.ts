import { LoadSurveys } from '../../../domain/usecases/load-surveys.usecase'
import { LoadSurveysRepository } from '../../protocols/database/survey/load-surveys-repository'
import { SurveyModel } from '../add-survey/db-add-survey.protocol'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.findAll()
  }
}
