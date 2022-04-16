import { Hasher, HashComparer, Encrypter, Decrypter } from '@/data/protocols'

export function mockHasher (): Hasher {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new HasherStub()
}

export function mockHashComparer (): HashComparer {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hashedValue: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparerStub()
}

export function mockEncrypter (): Encrypter {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}

export function mockDecrypter (): Decrypter {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}
