import { AddSurveyRepository, AddSurveyModel } from './db-add-survey.protocol'
import { DbAddSurvey } from './db-add-survey.usecase'

interface SutType {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

function makeAddSurveyRepositoryStub (): AddSurveyRepository {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (addSurveyModel: AddSurveyModel): Promise<void> { }
  }

  return new AddSurveyRepositoryStub()
}

function makeSut (): SutType {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return { sut, addSurveyRepositoryStub }
}

function makeAddSurveyModel (): AddSurveyModel {
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

describe('DBAddSurvey UseCase', () => {
  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    const addSurveyModel = makeAddSurveyModel()

    await sut.add(addSurveyModel)
    expect(addSpy).toHaveBeenNthCalledWith(1, addSurveyModel)
  })
})
