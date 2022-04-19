
import { AddSurvey } from '@/domain/usecases'
import { AddSurveyController } from '@/presentation/controllers'
import { Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { MissingParamError, InternalServerError } from '@/presentation/errors'
import { mockValidation } from '@/tests/validation/mocks'
import { mockAddSurvey } from '@/tests/presentation/mocks'
import MockDate from 'mockdate'

type SutType = {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

function makeSut (): SutType {
  const validationStub = mockValidation()
  const addSurveyStub = mockAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

function mockRequest (): AddSurveyController.Request {
  return {
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
        image: 'any_images'
      }
    ]
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationStubSpy = jest.spyOn(validationStub, 'validate')

    const request = mockRequest()

    await sut.handle(request)

    expect(validationStubSpy).toHaveBeenNthCalledWith(1, request)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('any_field')
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(error)

    const request = mockRequest()

    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(badRequest(error))
  })

  test('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyStub, 'add')

    const request = mockRequest()

    await sut.handle(request)

    expect(addSurveySpy).toHaveBeenNthCalledWith(1, { ...request, date: new Date() })
  })

  test('should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()

    jest.spyOn(addSurveyStub, 'add')
      .mockRejectedValueOnce(new Error('any message'))

    const request = mockRequest()

    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()

    const request = mockRequest()

    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(noContent())
  })
})
