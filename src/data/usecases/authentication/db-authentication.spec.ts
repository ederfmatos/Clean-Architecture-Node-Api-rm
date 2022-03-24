import { AuthenticationModel } from '../../../domain/usecases/authentication.usecase'
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
        password: 'any_password'
      }
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

interface SutType {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

function makeSut (): SutType {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return { sut, loadAccountByEmailRepositoryStub }
}

function makeFakeAuthentication (): AuthenticationModel {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
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
})
