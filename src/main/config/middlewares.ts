import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser/body-parser.middleware'
import { contentType } from '../middlewares/content-type/content-type.middleware'
import { cors } from '../middlewares/cors/cors.middleware'

export function configureMiddlewares (app: Express): void {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
