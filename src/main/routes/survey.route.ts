import { Router } from 'express'
import { handleExpressRoute } from '@/main/adapters/express/express-route.adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey.factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/load-surveys/load-surveys.factory'
import { adminAuthMiddleware } from '@/main/middlewares/auth/admin-auth'
import { authMiddleware } from '@/main/middlewares/auth/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuthMiddleware, handleExpressRoute(makeAddSurveyController()))
  router.get('/surveys', authMiddleware, handleExpressRoute(makeLoadSurveysController()))
}
