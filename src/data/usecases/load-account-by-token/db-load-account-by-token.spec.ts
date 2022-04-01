import { Decrypter } from '../../protocols/criptography'
import { DbLoadAccountByToken } from './db-load-account-by-token.usecase'

interface SutType {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

function makeSut (): SutType {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return { sut, decrypterStub }
}

function makeDecrypter (): Decrypter {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}

describe('DbLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadAccountByToken('any-token')
    expect(decryptSpy).toHaveBeenNthCalledWith(1, 'any-token')
  })
})
