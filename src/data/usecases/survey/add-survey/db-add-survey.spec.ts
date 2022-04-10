import { AddSurveyRepository } from './db-add-survey.protocol'
import { DbAddSurvey } from './db-add-survey.usecase'
import { mockAddSurveyParams } from '@/domain/test'
import { mockAddSurveyRepository } from '@/data/test'
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

    const AddSurveyParams = mockAddSurveyParams()

    await sut.add(AddSurveyParams)
    expect(addSpy).toHaveBeenNthCalledWith(1, AddSurveyParams)
  })

  test('should throws if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error('any message')
    })

    const AddSurveyParams = mockAddSurveyParams()

    const response = sut.add(AddSurveyParams)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })
})
