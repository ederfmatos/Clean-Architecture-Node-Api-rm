import { handleExpressMiddleware } from '@/main/adapters/express/express.middleware.adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware/auth-middleware.factory'

export const authMiddleware = handleExpressMiddleware(makeAuthMiddleware())
