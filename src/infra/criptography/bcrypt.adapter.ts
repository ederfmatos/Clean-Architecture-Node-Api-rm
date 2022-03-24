import bcrypt from 'bcrypt'
import { HashComparer } from '../../data/protocols/criptography'
import { Hasher } from '../../data/protocols/criptography/hasher.protocol'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  hash (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }

  compare (value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue)
  }
}
