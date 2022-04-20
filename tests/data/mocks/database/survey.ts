import { AddSurveyRepository, ExistsSurveyByIdRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols'
import { mockSurveyModel, mockSurveysModel } from '@/tests/domain/mocks'

export function mockAddSurveyRepository (): AddSurveyRepository {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (addSurveyParams: AddSurveyRepository.Params): Promise<void> { }
  }

  return new AddSurveyRepositoryStub()
}

export function mockLoadSurveysRepository (): LoadSurveysRepository {
  class LoadAccountByTokenRepositoryStub implements LoadSurveysRepository {
    async findAll (): Promise<LoadSurveysRepository.Response[]> {
      return mockSurveysModel()
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export function mockLoadSurveyByIdRepository (): LoadSurveyByIdRepository {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<LoadSurveyByIdRepository.Response> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export function mockExistsSurveyByIdRepository (): ExistsSurveyByIdRepository {
  class ExistsSurveyByIdRepositoryStub implements ExistsSurveyByIdRepository {
    async existsById (id: string): Promise<ExistsSurveyByIdRepository.Response> {
      return true
    }
  }
  return new ExistsSurveyByIdRepositoryStub()
}
