import { Router } from 'express'
import { handleExpressRoute } from '../adapters/express/express-route.adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey.factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys.factory'
import { adminAuthMiddleware } from '../middlewares/auth/admin-auth'
import { authMiddleware } from '../middlewares/auth/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuthMiddleware, handleExpressRoute(makeAddSurveyController()))
  router.get('/surveys', authMiddleware, handleExpressRoute(makeLoadSurveysController()))
}
