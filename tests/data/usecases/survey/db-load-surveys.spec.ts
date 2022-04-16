import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveysRepository } from '@/data/protocols'
import { mockSurveysModel } from '@/tests/domain/mocks'
import { mockLoadSurveysRepository } from '@/tests/data/mocks'
import MockDate from 'mockdate'

type SutType = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

function makeSut (): SutType {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return { sut, loadSurveysRepositoryStub }
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
    await sut.load('any_account_id')
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'findAll').mockRejectedValue(new Error('any message'))
    const response = sut.load('any_account_id')
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns surveys on LoadSurveysRepository succeds', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load('any_account_id')
    expect(surveys).toEqual(mockSurveysModel())
  })
})
