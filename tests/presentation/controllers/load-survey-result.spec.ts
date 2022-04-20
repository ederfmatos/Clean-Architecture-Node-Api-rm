
import { ExistsSurveyById, LoadSurveyResult } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { mockSurveyResultModel } from '@/tests/domain/mocks'
import { mockExistsSurveyById, mockLoadSurveyResult } from '@/tests/presentation/mocks'
import MockDate from 'mockdate'

type SutType = {
  sut: LoadSurveyResultController
  existsSurveyByIdStub: ExistsSurveyById
  loadSurveyResult: LoadSurveyResult
}

function makeSut (): SutType {
  const existsSurveyByIdStub = mockExistsSurveyById()
  const loadSurveyResult = mockLoadSurveyResult()
  const sut = new LoadSurveyResultController(existsSurveyByIdStub, loadSurveyResult)

  return {
    sut,
    existsSurveyByIdStub,
    loadSurveyResult
  }
}

function mockRequest (): LoadSurveyResultController.Request {
  return {
    accountId: 'any_account_id',
    surveyId: 'any_id'
  }
}

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call ExistsSurveyById with correct value', async () => {
    const { sut, existsSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(existsSurveyByIdStub, 'existsById')
    await sut.handle(mockRequest())
    expect(loadSurveyByIdSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should returns 403 if ExistsSurveyById returns false', async () => {
    const { sut, existsSurveyByIdStub } = makeSut()
    jest.spyOn(existsSurveyByIdStub, 'existsById').mockResolvedValue(false)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should returns 500 if ExistsSurveyById throws', async () => {
    const { sut, existsSurveyByIdStub } = makeSut()
    jest.spyOn(existsSurveyByIdStub, 'existsById').mockRejectedValueOnce(new Error('any message'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error('any message')))
  })

  test('should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResult } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResult, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_id', 'any_account_id')
  })

  test('should returns 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResult } = makeSut()
    jest.spyOn(loadSurveyResult, 'load').mockRejectedValueOnce(new Error('any message'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error('any message')))
  })

  test('should returns 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
