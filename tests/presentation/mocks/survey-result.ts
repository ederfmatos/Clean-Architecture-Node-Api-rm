import { mockSurveyResultModel } from '@/tests/domain/mocks'
import { SaveSurveyResult, LoadSurveyResult, ExistsSurveyById, LoadAnswersBySurvey } from '@/domain/usecases'

export function mockSaveSurveyResult (): SaveSurveyResult {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (saveSurveyResultParams: SaveSurveyResult.Params): Promise<SaveSurveyResult.Response> {
      return mockSurveyResultModel()
    }
  }
  return new SaveSurveyResultStub()
}

export function mockLoadAnswersBySurvey (): LoadAnswersBySurvey {
  class LoadAnswersBySurveyStub implements LoadAnswersBySurvey {
    async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Response> {
      return ['any_answer']
    }
  }

  return new LoadAnswersBySurveyStub()
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
