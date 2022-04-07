import {
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from './db-authentication.protocol'

import { AccountModel } from '@/domain/models/account.model'
import { DbAuthentication } from './db-authentication.usecase'

function makeLoadAccountByEmailRepository (): LoadAccountByEmailRepository {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
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

type SutType = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

function makeSut (): SutType {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const encrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()

  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub
    ,
    updateAccessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
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

function makeEncrypter (): Encrypter {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}

function makeUpdateAccessTokenRepository (): UpdateAccessTokenRepository {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (accountId: string, accessToken: string): Promise<void> {

    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

describe('DBAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    await sut.authenticate(makeFakeAuthentication())

    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_email@mail.com')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error('any message'))

    const response = sut.authenticate(makeFakeAuthentication())

    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(Promise.resolve(null))

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

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValue(false)

    const accessToken = await sut.authenticate(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test('should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generatorSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.authenticate(makeFakeAuthentication())

    expect(generatorSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error('any message'))

    const response = sut.authenticate(makeFakeAuthentication())

    await expect(response).rejects.toThrowError(new Error('any message'))
  })

  test('should return access token on success', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.authenticate(makeFakeAuthentication())

    expect(accessToken).toBe('any_token')
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')

    await sut.authenticate(makeFakeAuthentication())

    expect(updateAccessTokenSpy).toHaveBeenNthCalledWith(1, 'any_id', 'any_token')
  })

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockRejectedValueOnce(new Error('any message'))

    const response = sut.authenticate(makeFakeAuthentication())

    await expect(response).rejects.toThrowError(new Error('any message'))
  })
})
