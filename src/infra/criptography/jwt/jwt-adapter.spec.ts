import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt.adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_value_encrypted'
  }
}))

function makeSut (): JwtAdapter {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
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
})
