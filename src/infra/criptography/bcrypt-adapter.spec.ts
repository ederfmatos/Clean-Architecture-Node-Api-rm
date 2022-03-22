import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt.adapter'

interface SutType {
  sut: BcryptAdapter
}

const salt = 12

function makeSut (): SutType {
  const sut = new BcryptAdapter(salt)
  return { sut }
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hashed_value'
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(bcryptSpy).toHaveBeenNthCalledWith(1, 'any_value', salt)
  })

  test('should return a hash on success', async () => {
    const { sut } = makeSut()

    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error('any message')))
    const response = sut.encrypt('any_value')
    await expect(response).rejects.toThrowError('any message')
  })
})
