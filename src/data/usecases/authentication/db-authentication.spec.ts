import { AuthenticationModel } from '../../../domain/usecases/authentication.usecase'
import { HashComparer } from '../../protocols/criptography/hash-comparer.protocol'
import { TokenGenerator } from '../../protocols/criptography/token-generator.proptocol'
import { LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../protocols/database/update-access-token-repository.protocol'
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
  tokenGeneratorStub: TokenGenerator
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

function makeSut (): SutType {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()

  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
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

function makeTokenGenerator (): TokenGenerator {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return 'any_token'
    }
  }

  return new TokenGeneratorStub()
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

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValue(false)

    const accessToken = await sut.authenticate(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test('should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generatorSpy = jest.spyOn(tokenGeneratorStub, 'generate')

    await sut.authenticate(makeFakeAuthentication())

    expect(generatorSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockRejectedValueOnce(new Error('any message'))

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
})
