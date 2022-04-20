import { ExistsSurveyByIdRepository } from '@/data/protocols'
import { ExistsSurveyById } from '@/domain/usecases'

export class DbExistsSurveyById implements ExistsSurveyById {
  constructor (private readonly existsSurveyByIdRepository: ExistsSurveyByIdRepository) {}

  async existsById (id: string): Promise<ExistsSurveyById.Response> {
    return this.existsSurveyByIdRepository.existsById(id)
  }
}
