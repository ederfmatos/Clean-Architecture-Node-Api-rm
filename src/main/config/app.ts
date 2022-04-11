import express from 'express'
import { configureMiddlewares } from './middlewares'
import { configureRoutes } from './routes'
import { configureSwagger } from './swagger'

const app = express()

configureSwagger(app)
configureMiddlewares(app)
configureRoutes(app)

export default app
