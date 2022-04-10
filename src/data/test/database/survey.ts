import { LoadSurveysRepository } from '@/data/protocols/database/survey/load-surveys-repository'
import { AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey.protocol'
import { AddSurveyParams } from '@/domain//usecases/survey/add-survey.usecase'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test'
import { SurveyModel } from '@/domain/models/survey.model'
import { LoadSurveyByIdRepository } from '@/data/protocols/database/survey/load-survey-by-id-repository'

export function mockAddSurveyRepository (): AddSurveyRepository {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (AddSurveyParams: AddSurveyParams): Promise<void> { }
  }

  return new AddSurveyRepositoryStub()
}

export function mockLoadSurveysRepository (): LoadSurveysRepository {
  class LoadAccountByTokenRepositoryStub implements LoadSurveysRepository {
    async findAll (): Promise<SurveyModel[]> {
      return mockSurveysModel()
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export function mockLoadSurveyByIdRepository (): LoadSurveyByIdRepository {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}
