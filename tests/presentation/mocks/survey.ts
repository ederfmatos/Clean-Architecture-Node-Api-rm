import { SurveyModel } from '@/domain/models'
import { AddSurvey, AddSurveyParams, LoadSurveys } from '@/domain/usecases'
import { mockSurveysModel } from '@/tests/domain/mocks'

export function mockAddSurvey (): AddSurvey {
  class AddSurveyStub implements AddSurvey {
    async add (input: AddSurveyParams): Promise<void> {
    }
  }

  return new AddSurveyStub()
}

export function mockLoadSurveys (): LoadSurveys {
  class LoadSurveysStub implements LoadSurveys {
    async load (accountId: string): Promise<SurveyModel[]> {
      return mockSurveysModel()
    }
  }

  return new LoadSurveysStub()
}
