
import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadAnswersBySurveyRepository } from '@/data/protocols'
import { mockLoadAnswersBySurveyRepository } from '@/tests/data/mocks'

type SutType = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositoryStub: LoadAnswersBySurveyRepository
}

function makeSut (): SutType {
  const loadAnswersBySurveyRepositoryStub = mockLoadAnswersBySurveyRepository()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositoryStub)
  return { sut, loadAnswersBySurveyRepositoryStub }
}

describe('DBLoadAnswersBySurvey', () => {
  test('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers')
    await sut.loadAnswers('any_id')
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers').mockRejectedValue(new Error('any message'))
    const response = sut.loadAnswers('any_id')
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns answers on success', async () => {
    const { sut } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual(['any_answer'])
  })

  test('should returns null if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers').mockResolvedValueOnce(null)
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toBeFalsy()
  })
})
