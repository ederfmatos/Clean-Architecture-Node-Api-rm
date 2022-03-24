import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export function configureRoutes (app: Express): void {
  const router = Router()

  const files = readdirSync(path.resolve(__dirname, '..', 'routes'))

  files.filter(file => !file.includes('.test.ts')).forEach(async (file) => {
    const route = (await import(`../routes/${file}`)).default
    route(router)
  })

  app.use('/api', router)
}
