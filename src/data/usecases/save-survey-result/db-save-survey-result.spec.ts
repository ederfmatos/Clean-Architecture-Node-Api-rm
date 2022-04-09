import { DbSaveSurveyResult } from './db-save-survey-result.usecase'
import { SurveyResultModel, SaveSurveyResultRepository, SaveSurveyResultModel } from './db-save-survey-result.protocol'
import MockDate from 'mockdate'

type SutType = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

function makeSut (): SutType {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return { sut, saveSurveyResultRepositoryStub }
}

function makeSaveSurveyResultRepository (): SaveSurveyResultRepository {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (saveSurveyResultModel: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeSurveyResultModel()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

function makeSurveyResultModel (): SurveyResultModel {
  return {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

function makeSaveSurveyResult (): SaveSurveyResultModel {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
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
    const saveSurveyResult = makeSaveSurveyResult()
    await sut.save(saveSurveyResult)
    expect(saveSpy).toHaveBeenNthCalledWith(1, saveSurveyResult)
  })

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValue(new Error('any message'))
    const response = sut.save(makeSaveSurveyResult())
    await expect(response).rejects.toThrowError(new Error('any message'))
  })
})
