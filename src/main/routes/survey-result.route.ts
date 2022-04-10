import { Router } from 'express'
import { handleExpressRoute } from '@/main/adapters/express/express-route.adapter'
import { authMiddleware } from '@/main/middlewares/auth/auth'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result.factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', authMiddleware, handleExpressRoute(makeSaveSurveyResultController()))
}
