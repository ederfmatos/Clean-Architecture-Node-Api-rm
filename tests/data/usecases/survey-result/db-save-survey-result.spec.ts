import { DbSaveSurveyResult } from '@/data/usecases'
import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/protocols'
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/tests/domain/mocks'
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '@/tests/data/mocks'
import MockDate from 'mockdate'

type SutType = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

function makeSut (): SutType {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub)
  return { sut, saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub }
}

describe('DbSaveSurveyResult', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call SaveSurveyResultRepository with correct values', async () => {
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

  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const saveSurveyResult = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResult)
    expect(loadBySurveyIdSpy).toHaveBeenNthCalledWith(1, saveSurveyResult.surveyId, saveSurveyResult.accountId)
  })

  test('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValue(new Error('any message'))
    const response = sut.save(mockSaveSurveyResultParams())
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns a SurveyResultModel on SaveSurveyResultRepository succeds', async () => {
    const { sut } = makeSut()
    const survey = await sut.save(mockSaveSurveyResultParams())
    expect(survey).toEqual(mockSurveyResultModel())
  })
})
