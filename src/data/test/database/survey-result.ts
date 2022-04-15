
import { LoadSurveyResultRepository } from '@/data/protocols/database/survey-result/load-survey-result-repository'
import { SaveSurveyResultRepository } from '@/data/protocols/database/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'

export function mockSaveSurveyResultRepository (): SaveSurveyResultRepository {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (saveSurveyResultParams: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export function mockLoadSurveyResultRepository (): LoadSurveyResultRepository {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
