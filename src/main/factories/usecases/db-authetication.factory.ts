import { HashComparer, Encrypter } from '@/data/protocols/criptography'
import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/database/mongodb'
import env from '@/main/config/env'

export function makeAuthentication (): Authentication {
  const accountMongoRepository: AccountMongoRepository = new AccountMongoRepository()
  const hashComparer: HashComparer = new BcryptAdapter(env.bcryptSalt)
  const encrypter: Encrypter = new JwtAdapter(env.jwtSecret)

  return new DbAuthentication(
    accountMongoRepository,
    hashComparer,
    encrypter,
    accountMongoRepository
  )
}
