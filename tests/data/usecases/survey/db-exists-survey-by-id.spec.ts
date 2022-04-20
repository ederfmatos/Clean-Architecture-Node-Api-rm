
import { DbExistsSurveyById } from '@/data/usecases'
import { ExistsSurveyByIdRepository } from '@/data/protocols'
import { mockExistsSurveyByIdRepository } from '@/tests/data/mocks'

type SutType = {
  sut: DbExistsSurveyById
  existsSurveyByIdRepositoryStub: ExistsSurveyByIdRepository
}

function makeSut (): SutType {
  const existsSurveyByIdRepositoryStub = mockExistsSurveyByIdRepository()
  const sut = new DbExistsSurveyById(existsSurveyByIdRepositoryStub)
  return { sut, existsSurveyByIdRepositoryStub }
}

describe('DBExistsSurveyById', () => {
  test('should call ExistsSurveyByIdRepository', async () => {
    const { sut, existsSurveyByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(existsSurveyByIdRepositoryStub, 'existsById')
    await sut.existsById('any_id')
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should throw if ExistsSurveyByIdRepository throws', async () => {
    const { sut, existsSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(existsSurveyByIdRepositoryStub, 'existsById').mockRejectedValue(new Error('any message'))
    const response = sut.existsById('any_id')
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should returns true if ExistsSurveyByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.existsById('any_id')
    expect(exists).toBe(true)
  })

  test('should returns false if ExistsSurveyByIdRepository returns false', async () => {
    const { sut, existsSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(existsSurveyByIdRepositoryStub, 'existsById').mockResolvedValueOnce(false)
    const exists = await sut.existsById('any_id')
    expect(exists).toBe(false)
  })
})
