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
  },
  async compare (): Promise<boolean> {
    return true
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call hash with correct value', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any_value')
    expect(bcryptSpy).toHaveBeenNthCalledWith(1, 'any_value', salt)
  })

  test('should return a valid hash on hash success', async () => {
    const { sut } = makeSut()

    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('should throw if hash throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error('any message')))
    const response = sut.hash('any_value')
    await expect(response).rejects.toThrowError('any message')
  })

  test('should call compare with correct value', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare('any_value', 'any_hash')
    expect(bcryptSpy).toHaveBeenNthCalledWith(1, 'any_value', 'any_hash')
  })

  test('should throw if compare throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.reject(new Error('any message')))
    const response = sut.compare('any_value', 'any_hash')
    await expect(response).rejects.toThrowError('any message')
  })

  test('should return true when compare succeds', async () => {
    const { sut } = makeSut()

    const result = await sut.compare('any_value', 'any_hash')
    expect(result).toBe(true)
  })

  test('should return false when compare fails', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => false)

    const result = await sut.compare('any_value', 'any_hash')
    expect(result).toBe(false)
  })
})
