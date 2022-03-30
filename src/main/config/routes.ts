import { Express, Router } from 'express'
import authRoute from '../routes/auth.route'
import surveyRoute from '../routes/survey.route'

type Route = (router: Router) => void

const routes: Route[] = [
  authRoute,
  surveyRoute
]

export function configureRoutes (app: Express): void {
  const router = Router()

  routes.forEach((route) => route(router))

  app.use('/api', router)
}
