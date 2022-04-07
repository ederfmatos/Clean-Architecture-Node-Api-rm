import { SurveyModel } from '@/domain/models/survey.model'
import { LoadSurveysRepository } from '@/data/protocols/database/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys.usecase'
import MockDate from 'mockdate'

type SutType = {
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'findAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'findAll').mockRejectedValue(new Error('any message'))
    const response = sut.load()
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns surveys on LoadSurveysRepository succeds', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeSurveys())
  })
})
