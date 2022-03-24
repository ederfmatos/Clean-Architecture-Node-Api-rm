import JsonWebToken from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/criptography'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    return JsonWebToken.sign({ id }, this.secret)
  }
}
