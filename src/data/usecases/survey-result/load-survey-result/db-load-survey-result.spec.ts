import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '@/data/test'
import { DbLoadSurveyResult } from './db-load-survey-result.usecase'
import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from './db-load-survey-result.protocol'
import { mockEmptySurveyResultModel, mockSurveyResultModel } from '@/domain/test'
import MockDate from 'mockdate'

type SutType = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepository: LoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

function makeSut (): SutType {
  const loadSurveyResultRepository = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepository, loadSurveyByIdRepositoryStub)
  return { sut, loadSurveyResultRepository, loadSurveyByIdRepositoryStub }
}

describe('DbLoadSurveyResult', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepository } = makeSut()
    const saveSpy = jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId')
    await sut.load('any_survey_id', 'any_account_id')
    expect(saveSpy).toHaveBeenNthCalledWith(1, 'any_survey_id', 'any_account_id')
  })

  test('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepository } = makeSut()
    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockRejectedValue(new Error('any message'))
    const response = sut.load('any_survey_id', 'any_account_id')
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns a SurveyResultModel on LoadSurveyResultRepository succeds', async () => {
    const { sut } = makeSut()
    const survey = await sut.load('any_survey_id', 'any_account_id')
    expect(survey).toEqual(mockSurveyResultModel())
  })

  test('should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepository, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockReturnValueOnce(null)

    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

    await sut.load('any_survey_id', 'any_account_id')
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_survey_id')
  })

  test('should returns a SurveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepository } = makeSut()
    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockReturnValueOnce(null)
    const survey = await sut.load('any_survey_id', 'any_account_id')
    expect(survey).toEqual(mockEmptySurveyResultModel())
  })
})
