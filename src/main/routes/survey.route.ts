import { Router } from 'express'
import { handleExpressRoute } from '@/main/adapters'
import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories'
import { adminAuthMiddleware, authMiddleware } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/surveys', adminAuthMiddleware, handleExpressRoute(makeAddSurveyController()))
  router.get('/surveys', authMiddleware, handleExpressRoute(makeLoadSurveysController()))
}
