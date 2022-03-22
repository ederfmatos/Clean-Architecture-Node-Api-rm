import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser/body-parser.middleware'

export function configureMiddlewares (app: Express): void {
  app.use(bodyParser)
}
