
import { LoadSurveys } from '@/domain/usecases'
import { HttpRequest } from '@/presentation/protocols'
import { InternalServerError } from '@/presentation/errors'
import { LoadSurveysController } from '@/presentation/controllers'
import { serverError, ok, noContent } from '@/presentation/helpers'
import { mockSurveysModel } from '@/tests/domain/mocks'
import { mockLoadSurveys } from '@/tests/presentation/mocks'
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

function mockRequest (): HttpRequest {
  return {
    account: {
      id: 'any_account_id'
    }
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_account_id')
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValue(new Error('any message'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveysModel()))
  })

  test('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValue([])
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
