import { AuthMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadAccountByToken } from '@/main/factories'

export function makeAuthMiddleware (role?: string): Middleware {
  const loadByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(loadByToken, role)
}
