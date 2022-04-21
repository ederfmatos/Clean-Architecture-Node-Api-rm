import { configureMiddlewares } from './middlewares'
import { configureRoutes } from './routes'
import { configureStaticFiles } from './static-files'
import { configureSwagger } from './swagger'
import express from 'express'
import { configureApolloServer } from './apollo-server'

const app = express()

void configureApolloServer(app)
configureStaticFiles(app)
configureSwagger(app)
configureMiddlewares(app)
configureRoutes(app)

export default app
