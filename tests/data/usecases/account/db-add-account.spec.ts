import { mockAddAccountParams } from '@/tests/domain/mocks'
import { Hasher, AddAccountRepository, ExistsAccountByEmailRepository } from '@/data/protocols'
import { DbAddAccount } from '@/data/usecases'
import { mockAddAccountRepository, mockHasher, mockExistsAccountByEmailRepository } from '@/tests/data/mocks'

type SutType = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  existsAccountByEmailRepositoryStub: ExistsAccountByEmailRepository
}

function makeSut (): SutType {
  const existsAccountByEmailRepositoryStub = mockExistsAccountByEmailRepository()
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, existsAccountByEmailRepositoryStub)
  return { sut, hasherStub, addAccountRepositoryStub, existsAccountByEmailRepositoryStub }
}

describe('DbAddAccount UseCase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    const account = mockAddAccountParams()

    await sut.add(account)
    expect(hasherSpy).toHaveBeenCalledTimes(1)
    expect(hasherSpy).toHaveBeenCalledWith(account.password)
  })

  test('should throws error if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error('any message'))

    const account = mockAddAccountParams()

    const response = sut.add(account)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountRepositorySpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const account = mockAddAccountParams()

    await sut.add(account)
    expect(addAccountRepositorySpy).toHaveBeenNthCalledWith(1, {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('should throws AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error('any message'))

    const account = mockAddAccountParams()

    const response = sut.add(account)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockResolvedValueOnce(false)

    const response = await sut.add(mockAddAccountParams())
    expect(response).toBe(false)
  })

  test('should return true on success', async () => {
    const { sut } = makeSut()

    const accountModel = mockAddAccountParams()

    const account = await sut.add(accountModel)
    expect(account).toBe(true)
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, existsAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(existsAccountByEmailRepositoryStub, 'existsByEmail')

    const account = mockAddAccountParams()

    await sut.add(account)

    expect(loadSpy).toHaveBeenNthCalledWith(1, account.email)
  })

  test('should return false if LoadAccountByEmailRepository returns true', async () => {
    const { sut, existsAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(existsAccountByEmailRepositoryStub, 'existsByEmail')
      .mockResolvedValueOnce(true)

    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(false)
  })
})
