import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser/body-parser.middleware'
import { cors } from '../middlewares/cors/cors.middleware'

export function configureMiddlewares (app: Express): void {
  app.use(bodyParser)
  app.use(cors)
}
