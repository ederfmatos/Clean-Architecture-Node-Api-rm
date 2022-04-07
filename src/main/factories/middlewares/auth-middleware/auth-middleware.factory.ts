import { AuthMiddleware } from '@/presentation/middlewares/auth/auth.middleware'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadAccountByToken } from '@/main/factories/usecases/account/load-account-by-token/db-load-account-by-token.factory'

export function makeAuthMiddleware (role?: string): Middleware {
  const loadByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(loadByToken, role)
}
