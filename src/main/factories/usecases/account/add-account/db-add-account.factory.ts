import { Hasher } from '@/data/protocols/criptography'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account.usecase'
import { AddAccount } from '@/domain/usecases/account/add-account.usecase'
import { BcryptAdapter } from '@/infra/criptography/bcrypt/bcrypt.adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account.repository'
import env from '@/main/config/env'

export function makeDbAddAccount (): AddAccount {
  const hasher: Hasher = new BcryptAdapter(env.bcryptSalt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(hasher, accountMongoRepository, accountMongoRepository)
}
