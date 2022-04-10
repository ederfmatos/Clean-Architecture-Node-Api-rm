import { AddSurveyRepository, AddSurveyParams } from './db-add-survey.protocol'
import { DbAddSurvey } from './db-add-survey.usecase'
import MockDate from 'mockdate'

type SutType = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

function makeAddSurveyRepositoryStub (): AddSurveyRepository {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (AddSurveyParams: AddSurveyParams): Promise<void> { }
  }

  return new AddSurveyRepositoryStub()
}

function makeSut (): SutType {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return { sut, addSurveyRepositoryStub }
}

function makeAddSurveyParams (): AddSurveyParams {
  return {
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
        image: 'any_images'
      }
    ],
    date: new Date()
  }
}

describe('DBAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    const AddSurveyParams = makeAddSurveyParams()

    await sut.add(AddSurveyParams)
    expect(addSpy).toHaveBeenNthCalledWith(1, AddSurveyParams)
  })

  test('should throws if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error('any message')
    })

    const AddSurveyParams = makeAddSurveyParams()

    const response = sut.add(AddSurveyParams)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })
})
