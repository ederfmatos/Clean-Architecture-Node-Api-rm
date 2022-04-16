import { Hasher } from '@/data/protocols'
import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/database/mongodb'
import env from '@/main/config/env'

export function makeDbAddAccount (): AddAccount {
  const hasher: Hasher = new BcryptAdapter(env.bcryptSalt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(hasher, accountMongoRepository, accountMongoRepository)
}
