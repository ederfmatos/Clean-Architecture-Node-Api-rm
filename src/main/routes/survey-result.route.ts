import { makeSaveSurveyResultController, makeLoadSurveyResultController } from '@/main/factories'
import { handleExpressRoute } from '@/main/adapters'
import { authMiddleware } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', authMiddleware, handleExpressRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', authMiddleware, handleExpressRoute(makeLoadSurveyResultController()))
}
