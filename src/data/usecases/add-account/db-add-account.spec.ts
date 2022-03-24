import { DbAddAccount } from './db-add-account.usecase'
import { AccountModel, AddAccountModel, Hasher } from './db-add-account.protocol'
import { AddAccountRepository } from '../../protocols/database/account/add-account-repository.protocol'

interface SutType {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

function makeHasher (): Hasher {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new HasherStub()
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
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return { sut, hasherStub, addAccountRepositoryStub }
}

function makeFakeAddAccount (): AddAccountModel {
  return {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password'
  }
}

function makeFakeAccount (): AccountModel {
  return {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'hashed_password'
  }
}

describe('DbAddAccount UseCase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    const account = makeFakeAddAccount()

    await sut.add(account)
    expect(hasherSpy).toHaveBeenCalledTimes(1)
    expect(hasherSpy).toHaveBeenCalledWith(account.password)
  })

  test('should throws error if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error('any message')))

    const account = makeFakeAddAccount()

    const response = sut.add(account)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountRepositorySpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const account = makeFakeAddAccount()

    await sut.add(account)
    expect(addAccountRepositorySpy).toHaveBeenNthCalledWith(1, {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('should throws AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error('any message'))

    const account = makeFakeAddAccount()

    const response = sut.add(account)
    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()

    const accountModel = makeFakeAddAccount()

    const account = await sut.add(accountModel)
    expect(account).toEqual(makeFakeAccount())
  })
})
