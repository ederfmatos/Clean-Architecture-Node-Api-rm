import { DbAddAccount } from './db-add-account.usecase'
import { AccountModel, AddAccountModel, Encrypter } from './db-add-account.protocol'
import { AddAccountRepository } from '../../protocols/add-account-repository.protocol'

interface SutType {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

function makeEncrypter (): Encrypter {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new EncrypterStub()
}

function makeAddAccountRepositoryStub (): AddAccountRepository {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
      return {
        id: 'valid_id',
        ...addAccountModel
      }
    }
  }

  return new AddAccountRepositoryStub()
}

function makeSut (): SutType {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return { sut, encrypterStub, addAccountRepositoryStub }
}

describe('DbAddAccount UseCase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(account)
    expect(encrypterSpy).toHaveBeenCalledTimes(1)
    expect(encrypterSpy).toHaveBeenCalledWith(account.password)
  })

  test('should throws error if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error('any message')))

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const response = sut.add(account)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountRepositorySpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(account)
    expect(addAccountRepositorySpy).toHaveBeenCalledTimes(1)
    expect(addAccountRepositorySpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('should throws AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error('any message'))

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const response = sut.add(account)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })
})
