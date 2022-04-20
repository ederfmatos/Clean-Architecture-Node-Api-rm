
import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/protocols'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export function mockSaveSurveyResultRepository (): SaveSurveyResultRepository {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (saveSurveyResultParams: SaveSurveyResultRepository.Params): Promise<void> {
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export function mockLoadSurveyResultRepository (): LoadSurveyResultRepository {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<LoadSurveyResultRepository.Response> {
      return mockSurveyResultModel()
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
