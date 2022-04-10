import { SurveyModel } from '@/domain/models/survey.model'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { mockSurveyModel, mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id.usecase'

export function mockSaveSurveyResult (): SaveSurveyResult {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (SaveSurveyResultParams: SaveSurveyResultParams): Promise<SurveyResultModel> {
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
