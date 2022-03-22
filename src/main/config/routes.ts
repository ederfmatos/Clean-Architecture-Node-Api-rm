import { Express, Router } from 'express'
import FastGlob from 'fast-glob'

export function configureRoutes (app: Express): void {
  const router = Router()

  const files = FastGlob.sync('**/src/main/routes/*.route.ts')
  files.forEach(async (file) => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })

  app.use('/api', router)
}
