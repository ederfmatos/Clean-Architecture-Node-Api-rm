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
})
