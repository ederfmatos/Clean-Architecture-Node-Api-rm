import { MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http/http.helper'
import { HttpRequest, Validation } from '../../../protocols'
import { AddSurveyController } from './add-survey.controller'

interface SutType {
  sut: AddSurveyController
  validationStub: Validation
}

function makeSut (): SutType {
  const validationStub = makeValidationStub()
  const sut = new AddSurveyController(validationStub)

  return {
    sut,
    validationStub
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
      ]
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

describe('AddSurvey Controller', () => {
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
})
