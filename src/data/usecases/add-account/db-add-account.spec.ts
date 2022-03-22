import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account.usecase'

interface SutType {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

function makeEncrypter (): Encrypter {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new EncrypterStub()
}

function makeSut (): SutType {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)
  return { sut, encrypterStub }
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
})
