import JsonWebToken from 'jsonwebtoken'
import { Decrypter, Encrypter } from '../../../data/protocols/criptography'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    return JsonWebToken.sign({ id }, this.secret)
  }

  async decrypt (value: string): Promise<string> {
    JsonWebToken.verify(value, this.secret)
    return ''
  }
}
