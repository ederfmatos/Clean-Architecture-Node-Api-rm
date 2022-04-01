import { Router } from 'express'
import { handleExpressRoute } from '../adapters/express/express-route.adapter'
import { handleExpressMiddleware } from '../adapters/express/express.middleware.adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey.factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware/auth-middleware.factory'

export default (router: Router): void => {
  const adminAuthMiddleware = handleExpressMiddleware(makeAuthMiddleware('ADMIN'))

  router.post('/surveys', adminAuthMiddleware, handleExpressRoute(makeAddSurveyController()))
}
