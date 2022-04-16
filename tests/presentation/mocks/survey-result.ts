import { SurveyResultModel, SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveyResultModel } from '@/tests/domain/mocks'
import { SaveSurveyResult, SaveSurveyResultParams, LoadSurveyById, LoadSurveyResult } from '@/domain/usecases'

export function mockSaveSurveyResult (): SaveSurveyResult {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (saveSurveyResultParams: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new SaveSurveyResultStub()
}

export function mockLoadSurveyById (): LoadSurveyById {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }

  return new LoadSurveyByIdStub()
}

export function mockLoadSurveyResult (): LoadSurveyResult {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }

  return new LoadSurveyResultStub()
}
