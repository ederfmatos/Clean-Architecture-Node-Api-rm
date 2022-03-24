import JsonWebToken from 'jsonwebtoken'
import { JwtAdapter } from './jwt.adapter'

jest.mock('jsonwebtoken', () => ({
  sign: () => 'any_value_enprypted'
}))

function makeSut (): JwtAdapter {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  test('should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(JsonWebToken, 'sign')

    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenNthCalledWith(1, { id: 'any_id' }, 'secret')
  })
})
