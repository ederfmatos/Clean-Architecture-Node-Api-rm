import { LoadSurveys } from '@/domain/usecases/load-surveys.usecase'
import { LoadSurveysRepository } from '@/data/protocols/database/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey.model'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.findAll()
  }
}
