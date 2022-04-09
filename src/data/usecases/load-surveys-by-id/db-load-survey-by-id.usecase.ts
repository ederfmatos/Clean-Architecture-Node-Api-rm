import { LoadSurveyByIdRepository } from '@/data/protocols/database/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey.model'
import { LoadSurveyById } from '@/domain/usecases/load-survey-by-id.usecase'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    return this.loadSurveyByIdRepository.loadById(id)
  }
}
