import { Hasher } from '../../../../data/protocols/criptography'
import { AddAccountRepository } from '../../../../data/protocols/database'
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account.usecase'
import { AddAccount } from '../../../../domain/usecases/add-account.usecase'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt.adapter'
import { AccountMongoRepository } from '../../../../infra/database/mongodb/account-repository/account.repository'
import env from '../../../config/env'

export function makeDbAddAccount (): AddAccount {
  const hasher: Hasher = new BcryptAdapter(env.bcryptSalt)
  const addAccountRepository: AddAccountRepository = new AccountMongoRepository()
  return new DbAddAccount(hasher, addAccountRepository)
}
