import { DbSaveSurveyResult } from './db-save-survey-result.usecase'
import { SaveSurveyResultRepository } from './db-save-survey-result.protocol'
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test'
import { mockSaveSurveyResultRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutType = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

function makeSut (): SutType {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return { sut, saveSurveyResultRepositoryStub }
}

describe('DbSaveSurveyResult', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call SaveSurveyResultRepository', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const saveSurveyResult = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResult)
    expect(saveSpy).toHaveBeenNthCalledWith(1, saveSurveyResult)
  })

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValue(new Error('any message'))
    const response = sut.save(mockSaveSurveyResultParams())
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns a SurveyResultModel on SaveSurveyResultRepository succeds', async () => {
    const { sut } = makeSut()
    const survey = await sut.save(mockSaveSurveyResultParams())
    expect(survey).toEqual(mockSurveyResultModel())
  })
})
