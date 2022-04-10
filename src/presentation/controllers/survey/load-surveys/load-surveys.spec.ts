import { LoadSurveysController } from './load-surveys.controller'
import { LoadSurveys } from './load-surveys.protocol'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http.helper'
import { InternalServerError } from '@/presentation/errors'
import { mockSurveysModel } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test'
import MockDate from 'mockdate'

type SutType = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

function makeSut (): SutType {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return { sut, loadSurveysStub }
}

describe('LoadSurveys  Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValue(new Error('any message'))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockSurveysModel()))
  })

  test('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValue([])
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })
})
