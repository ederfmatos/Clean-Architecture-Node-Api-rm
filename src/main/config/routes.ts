import { Express, Router } from 'express'
import authRoute from '../routes/auth.route'

const routes: [(router: Router) => void] = [
  authRoute
]

export function configureRoutes (app: Express): void {
  const router = Router()

  routes.forEach((route) => route(router))

  app.use('/api', router)
}
