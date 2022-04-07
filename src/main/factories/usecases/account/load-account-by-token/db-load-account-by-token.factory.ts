import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token.usecase'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token.usecase'
import { JwtAdapter } from '@/infra/criptography/jwt/jwt.adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account.repository'
import env from '@/main/config/env'

export function makeDbLoadAccountByToken (): LoadAccountByToken {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
