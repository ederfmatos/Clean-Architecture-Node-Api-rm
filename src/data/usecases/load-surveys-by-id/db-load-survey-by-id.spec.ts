import { SurveyModel } from '@/domain/models/survey.model'
import { DbLoadSurveyById } from './db-load-survey-by-id.usecase'
import MockDate from 'mockdate'
import { LoadSurveyByIdRepository } from '@/data/protocols/database/survey/load-survey-by-id-repository'

type SutType = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

function makeSut (): SutType {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return { sut, loadSurveyByIdRepositoryStub }
}

function makeLoadSurveyByIdRepository (): LoadSurveyByIdRepository {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return makeSurvey()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
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

describe('DBLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockRejectedValue(new Error('any message'))
    const response = sut.loadById('any_id')
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns a survey on LoadSurveyByIdRepository succeds', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById('any_id')
    expect(surveys).toEqual(makeSurvey())
  })
})
