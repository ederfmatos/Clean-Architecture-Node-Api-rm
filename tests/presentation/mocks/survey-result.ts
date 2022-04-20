import { mockSurveyModel, mockSurveyResultModel } from '@/tests/domain/mocks'
import { SaveSurveyResult, LoadSurveyById, LoadSurveyResult, ExistsSurveyById } from '@/domain/usecases'

export function mockSaveSurveyResult (): SaveSurveyResult {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (saveSurveyResultParams: SaveSurveyResult.Params): Promise<SaveSurveyResult.Response> {
      return mockSurveyResultModel()
    }
  }
  return new SaveSurveyResultStub()
}

export function mockLoadSurveyById (): LoadSurveyById {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<LoadSurveyById.Response> {
      return mockSurveyModel()
    }
  }

  return new LoadSurveyByIdStub()
}

export function mockExistsSurveyById (): ExistsSurveyById {
  class ExistsSurveyByIdStub implements ExistsSurveyById {
    async existsById (id: string): Promise<ExistsSurveyById.Response> {
      return true
    }
  }

  return new ExistsSurveyByIdStub()
}

export function mockLoadSurveyResult (): LoadSurveyResult {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<LoadSurveyResult.Response> {
      return mockSurveyResultModel()
    }
  }

  return new LoadSurveyResultStub()
}
