import { mockLoadSurveyResultRepository } from '@/data/test'
import { DbLoadSurveyResult } from './db-load-survey-result.usecase'
import MockDate from 'mockdate'
import { LoadSurveyResultRepository } from './db-load-survey-result.protocol'

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
})
