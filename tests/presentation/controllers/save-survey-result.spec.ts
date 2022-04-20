
import { LoadAnswersBySurvey, SaveSurveyResult } from '@/domain/usecases'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { InvalidParamError, InternalServerError } from '@/presentation/errors'
import { mockSurveyResultModel } from '@/tests/domain/mocks'
import { mockSaveSurveyResult, mockLoadAnswersBySurvey } from '@/tests/presentation/mocks'
import MockDate from 'mockdate'

type SutType = {
  sut: SaveSurveyResultController
  loadAnswersBySurveyStub: LoadAnswersBySurvey
  saveSurveyResultStub: SaveSurveyResult
}

function makeSut (): SutType {
  const saveSurveyResultStub = mockSaveSurveyResult()
  const loadAnswersBySurveyStub = mockLoadAnswersBySurvey()
  const sut = new SaveSurveyResultController(loadAnswersBySurveyStub, saveSurveyResultStub)
  return { sut, loadAnswersBySurveyStub, saveSurveyResultStub }
}

function mockRequest (): SaveSurveyResultController.Request {
  return {
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    accountId: 'any_account_id'
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadAnswersBySurvey with correct values', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    const loadSpy = jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers')

    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_survey_id')
  })

  test('should return 403 if LoadAnswersBySurvey returns empty array', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers').mockResolvedValue([])
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadAnswersBySurvey throws', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers').mockRejectedValue(new Error('any message'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })

  test('should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    request.answer = 'invalid_answer'
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenNthCalledWith(1, {
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      answer: 'any_answer',
      date: new Date()
    })
  })

  test('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValue(new Error('any message'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
