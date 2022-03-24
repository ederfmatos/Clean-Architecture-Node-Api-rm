import { AuthenticationModel } from '../../../domain/usecases/authentication.usecase'
import { HashComparer } from '../../protocols/criptography/hash-comparer.protocol'
import { LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account.protocol'
import { DbAuthentication } from './db-authentication.usecase'

function makeLoadAccountByEmailRepository (): LoadAccountByEmailRepository {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'hashed_password'
      }
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

interface SutType {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
}

function makeSut (): SutType {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub)
  return { sut, loadAccountByEmailRepositoryStub, hashComparerStub }
}

function makeFakeAuthentication (): AuthenticationModel {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

function makeHashComparer (): HashComparer {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hashedValue: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparerStub()
}

describe('DBAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    await sut.authenticate(makeFakeAuthentication())

    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_email@mail.com')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(new Error('any message'))

    const response = sut.authenticate(makeFakeAuthentication())

    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValue(Promise.resolve(null))

    const accessToken = await sut.authenticate(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test('should call HashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const hashComparerStubSpy = jest.spyOn(hashComparerStub, 'compare')

    await sut.authenticate(makeFakeAuthentication())

    expect(hashComparerStubSpy).toHaveBeenNthCalledWith(1, 'any_password', 'hashed_password')
  })

  test('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error('any message'))

    const response = sut.authenticate(makeFakeAuthentication())

    await expect(response).rejects.toThrowError(new Error('any message'))
  })
})
