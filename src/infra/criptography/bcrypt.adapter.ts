import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/criptography/encrypter.protocol'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}

  encrypt (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
