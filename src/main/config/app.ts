import { configureMiddlewares } from './middlewares'
import { configureRoutes } from './routes'
import { configureStaticFiles } from './static-files'
import { configureSwagger } from './swagger'
import express from 'express'

const app = express()

configureStaticFiles(app)
configureSwagger(app)
configureMiddlewares(app)
configureRoutes(app)

export default app
