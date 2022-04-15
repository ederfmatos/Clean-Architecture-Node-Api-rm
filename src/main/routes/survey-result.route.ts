import { makeSaveSurveyResultController, makeLoadSurveyResultController } from '@/main/factories/controllers/survey-result'
import { handleExpressRoute } from '@/main/adapters/express/express-route.adapter'
import { authMiddleware } from '@/main/middlewares/auth/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', authMiddleware, handleExpressRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', authMiddleware, handleExpressRoute(makeLoadSurveyResultController()))
}
