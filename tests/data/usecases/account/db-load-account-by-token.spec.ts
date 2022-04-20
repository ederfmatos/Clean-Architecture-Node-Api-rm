import { DbLoadAccountByToken } from '@/data/usecases'
import { Decrypter, LoadAccountByTokenRepository } from '@/data/protocols'
import { mockDecrypter, mockLoadAccountByTokenRepository } from '@/tests/data/mocks'

type SutType = {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

function makeSut (): SutType {
  const decrypterStub = mockDecrypter()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return { sut, decrypterStub, loadAccountByTokenRepositoryStub }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadAccountByToken('any-token')
    expect(decryptSpy).toHaveBeenNthCalledWith(1, 'any-token')
  })

  test('should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValue(null)
    const response = await sut.loadAccountByToken('any-token', 'any_role')
    expect(response).toBeNull()
  })

  test('should return null if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockRejectedValue(new Error('any message'))
    const account = await sut.loadAccountByToken('any-token', 'any_role')
    expect(account).toBeNull()
  })

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.loadAccountByToken('any-token', 'any_role')
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any-token', 'any_role')
  })

  test('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValue(null)
    const response = await sut.loadAccountByToken('any-token', 'any_role')
    expect(response).toBeNull()
  })

  test('should throws if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockRejectedValue(new Error('any message'))
    const response = sut.loadAccountByToken('any-token', 'any_role')
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.loadAccountByToken('any-token', 'any_role')
    expect(account).toEqual({ id: 'any_id' })
  })
})
