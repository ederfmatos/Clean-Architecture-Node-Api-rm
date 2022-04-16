import { Decrypter, Encrypter } from '@/data/protocols'
import JsonWebToken from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    return JsonWebToken.sign({ id }, this.secret)
  }

  async decrypt (token: string): Promise<string> {
    return JsonWebToken.verify(token, this.secret) as string
  }
}
