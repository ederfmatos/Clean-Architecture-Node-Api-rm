import { SurveyModel } from '@/domain/models/survey.model'
import { mockSurveysModel } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey.usecase'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys.usecase'

export function mockAddSurvey (): AddSurvey {
  class AddSurveyStub implements AddSurvey {
    async add (input: AddSurveyParams): Promise<void> {
    }
  }

  return new AddSurveyStub()
}

export function mockLoadSurveys (): LoadSurveys {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return mockSurveysModel()
    }
  }

  return new LoadSurveysStub()
}
