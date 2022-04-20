import { LoadSurveysRepository } from '@/data/protocols'
import { LoadSurveys } from '@/domain/usecases'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<LoadSurveys.Response[]> {
    return this.loadSurveysRepository.findAll(accountId)
  }
}
