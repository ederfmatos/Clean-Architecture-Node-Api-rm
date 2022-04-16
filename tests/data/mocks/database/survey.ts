import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'
import { AddSurveyParams } from '@/domain/usecases'
import { mockSurveyModel, mockSurveysModel } from '@/tests/domain/mocks'

export function mockAddSurveyRepository (): AddSurveyRepository {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (AddSurveyParams: AddSurveyParams): Promise<void> { }
  }

  return new AddSurveyRepositoryStub()
}

export function mockLoadSurveysRepository (): LoadSurveysRepository {
  class LoadAccountByTokenRepositoryStub implements LoadSurveysRepository {
    async findAll (): Promise<SurveyModel[]> {
      return mockSurveysModel()
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export function mockLoadSurveyByIdRepository (): LoadSurveyByIdRepository {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}
