import { DbAddAccount } from './db-add-account.usecase'
import { Hasher, LoadAccountByEmailRepository } from './db-add-account.protocol'
import { AddAccountRepository } from '@/data/protocols/database/account/add-account-repository.protocol'
import { mockAccountModel, mockAddAccountParams } from '@/domain/test'
import { mockAddAccountRepository, mockHasher, mockLoadAccountByEmailRepository } from '@/data/test'

type SutType = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

function makeSut (): SutType {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(null)

  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return { sut, hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub }
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

  test('should return an account on success', async () => {
    const { sut } = makeSut()

    const accountModel = mockAddAccountParams()

    const account = await sut.add(accountModel)
    expect(account).toEqual(mockAccountModel())
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    const account = mockAddAccountParams()

    await sut.add(account)

    expect(loadSpy).toHaveBeenNthCalledWith(1, account.email)
  })

  test('should return null if LoadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(mockAccountModel())

    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })
})
