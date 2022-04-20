
import { DbAddSurvey } from '@/data/usecases'
import { AddSurveyRepository } from '@/data/protocols'
import { mockAddSurveyParams } from '@/tests/domain/mocks'
import { mockAddSurveyRepository } from '@/tests/data/mocks'
import MockDate from 'mockdate'

type SutType = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

function makeSut (): SutType {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return { sut, addSurveyRepositoryStub }
}

describe('DBAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    const params = mockAddSurveyParams()

    await sut.add(params)
    expect(addSpy).toHaveBeenNthCalledWith(1, params)
  })

  test('should throws if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error('any message')
    })

    const params = mockAddSurveyParams()

    const response = sut.add(params)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })
})
