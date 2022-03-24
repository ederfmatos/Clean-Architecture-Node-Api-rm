import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/criptography/hasher.protocol'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  hash (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
