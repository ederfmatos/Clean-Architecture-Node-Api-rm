import { handleExpressMiddleware } from '../../adapters/express/express.middleware.adapter'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware/auth-middleware.factory'

export const authMiddleware = handleExpressMiddleware(makeAuthMiddleware())
