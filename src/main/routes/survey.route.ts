import { Router } from 'express'
import { handleExpressRoute } from '../adapters/express/express-route.adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey.factory'

export default (router: Router): void => {
  router.post('/surveys', handleExpressRoute(makeAddSurveyController()))
}
