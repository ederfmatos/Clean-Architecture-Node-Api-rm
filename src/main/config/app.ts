import express from 'express'
import { configureMiddlewares } from './middlewares'
import { configureRoutes } from './routes'

const app = express()

configureMiddlewares(app)
configureRoutes(app)

export default app
