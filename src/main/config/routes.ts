import { Express, Router } from 'express'
import authRoute from '@/main/routes/auth.route'
import surveyRoute from '@/main/routes/survey.route'
import surveyResultRoute from '@/main/routes/survey-result.route'

type Route = (router: Router) => void

const routes: Route[] = [
  authRoute,
  surveyRoute,
  surveyResultRoute
]

export function configureRoutes (app: Express): void {
  const router = Router()

  routes.forEach((route) => route(router))

  app.use('/api', router)
}
