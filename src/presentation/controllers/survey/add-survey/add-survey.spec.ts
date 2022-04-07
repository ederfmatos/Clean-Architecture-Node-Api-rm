import { InternalServerError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http.helper'
import { HttpRequest, Validation, AddSurvey, AddSurveyModel } from './add-survey.protocol'
import { AddSurveyController } from './add-survey.controller'
import MockDate from 'mockdate'

type SutType = {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

function makeSut (): SutType {
  const validationStub = makeValidationStub()
  const addSurveyStub = makeAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

function makeFakeRequest (): HttpRequest {
  return {
    body: {
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ],
      date: new Date()
    }
  }
}

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

function makeAddSurvey (): AddSurvey {
  class AddSurveyStub implements AddSurvey {
    async add (input: AddSurveyModel): Promise<void> {
    }
  }

  return new AddSurveyStub()
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

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(validationStubSpy).toHaveBeenNthCalledWith(1, httpRequest.body)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('any_field')
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(error)

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(error))
  })

  test('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyStub, 'add')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(addSurveySpy).toHaveBeenNthCalledWith(1, httpRequest.body)
  })

  test('should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()

    jest.spyOn(addSurveyStub, 'add')
      .mockRejectedValueOnce(new Error('any message'))

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(noContent())
  })
})
