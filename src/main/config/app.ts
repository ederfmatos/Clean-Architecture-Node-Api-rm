import express from 'express'
import { configureMiddlewares } from './middlewares'
import { configureRoutes } from './routes'
import { configureStaticFiles } from './static-files'
import { configureSwagger } from './swagger'

const app = express()

configureStaticFiles(app)
configureSwagger(app)
configureMiddlewares(app)
configureRoutes(app)

export default app
