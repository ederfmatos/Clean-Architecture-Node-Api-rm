import { mockLoadSurveyResultRepository } from '@/data/test'
import { DbLoadSurveyResult } from './db-load-survey-result.usecase'
import { LoadSurveyResultRepository } from './db-load-survey-result.protocol'
import { mockSurveyResultModel } from '@/domain/test'
import MockDate from 'mockdate'

type SutType = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepository: LoadSurveyResultRepository
}

function makeSut (): SutType {
  const loadSurveyResultRepository = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepository)
  return { sut, loadSurveyResultRepository }
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
    await sut.load('any_survey_id')
    expect(saveSpy).toHaveBeenNthCalledWith(1, 'any_survey_id')
  })

  test('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepository } = makeSut()
    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockRejectedValue(new Error('any message'))
    const response = sut.load('any_survey_id')
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns a SurveyResultModel on LoadSurveyResultRepository succeds', async () => {
    const { sut } = makeSut()
    const survey = await sut.load('any_survey_id')
    expect(survey).toEqual(mockSurveyResultModel())
  })
})
