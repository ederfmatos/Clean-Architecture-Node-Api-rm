
import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadSurveyByIdRepository } from '@/data/protocols'
import { mockLoadSurveyByIdRepository } from '@/tests/data/mocks'

type SutType = {
  sut: DbLoadAnswersBySurvey
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

function makeSut (): SutType {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositoryStub)
  return { sut, loadSurveyByIdRepositoryStub }
}

describe('DBLoadAnswersBySurvey', () => {
  test('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadAnswers('any_id')
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockRejectedValue(new Error('any message'))
    const response = sut.loadAnswers('any_id')
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns answers on success', async () => {
    const { sut } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual(['any_answer'])
  })

  test('should returns null if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toBeFalsy()
  })
})
