import { AddSurvey, LoadSurveys } from '@/domain/usecases'
import { mockSurveysModel } from '@/tests/domain/mocks'

export function mockAddSurvey (): AddSurvey {
  class AddSurveyStub implements AddSurvey {
    async add (input: AddSurvey.Params): Promise<void> {
    }
  }

  return new AddSurveyStub()
}

export function mockLoadSurveys (): LoadSurveys {
  class LoadSurveysStub implements LoadSurveys {
    async load (accountId: string): Promise<LoadSurveys.Response[]> {
      return mockSurveysModel()
    }
  }

  return new LoadSurveysStub()
}
