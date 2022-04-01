import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt.adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_value_encrypted'
  },
  async verify (): Promise<string> {
    return 'any_value'
  }
}))

function makeSut (): JwtAdapter {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    test('should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')

      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenNthCalledWith(1, { id: 'any_id' }, 'secret')
    })

    test('should return a token on sign success', async () => {
      const sut = makeSut()

      const token = await sut.encrypt('any_id')
      expect(token).toBe('any_value_encrypted')
    })

    test('should call sign with correct values', async () => {
      const sut = makeSut()

      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        throw new Error('any-message')
      })

      const response = sut.encrypt('any_id')
      await expect(response).rejects.toThrowError(new Error('any-message'))
    })
  })

  describe('decrypter()', () => {
    test('should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')

      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenNthCalledWith(1, 'any_token', 'secret')
    })

    test('should return a value on verify success', async () => {
      const sut = makeSut()

      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })

    test('should throws if verify throws', async () => {
      const sut = makeSut()

      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('any-message')
      })

      const response = sut.decrypt('any_id')
      await expect(response).rejects.toThrowError(new Error('any-message'))
    })
  })
})
