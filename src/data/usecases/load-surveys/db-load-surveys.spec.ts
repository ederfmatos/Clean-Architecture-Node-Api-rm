import { SurveyModel } from '../../../domain/models/survey.model'
import { LoadSurveysRepository } from '../../protocols/database/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys.usecase'

interface SutType {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

function makeSut (): SutType {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return { sut, loadSurveysRepositoryStub }
}

function makeLoadSurveysRepository (): LoadSurveysRepository {
  class LoadAccountByTokenRepositoryStub implements LoadSurveysRepository {
    async findAll (): Promise<SurveyModel[]> {
      return makeSurveys()
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

function makeSurvey (): SurveyModel {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  }
}

function makeSurveys (): SurveyModel[] {
  return [makeSurvey(), makeSurvey()]
}

describe('DBLoadSurveys', () => {
  test('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'findAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })
})
