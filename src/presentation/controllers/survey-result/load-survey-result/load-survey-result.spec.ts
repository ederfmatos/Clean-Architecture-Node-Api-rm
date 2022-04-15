import { forbidden, serverError } from '@/presentation/helpers/http/http.helper'
import { mockLoadSurveyById } from '@/presentation/test'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error.error'
import { LoadSurveyResultController } from './load-survey-result.controller'
import { HttpRequest, LoadSurveyById } from './load-survey-result.protocol'

type SutType = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

function makeSut (): SutType {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)

  return {
    sut,
    loadSurveyByIdStub
  }
}

function mockRequest (): HttpRequest {
  return {
    params: {
      surveyId: 'any_id'
    }
  }
}

describe('LoadSurveyResult Controller', () => {
  test('should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadSurveyByIdSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should returns 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should returns 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error('any message'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error('any message')))
  })
})
