import swaggerConfig from '@/main/docs'
import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { noCache } from '../middlewares'

export function configureSwagger (app: Express): void {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
