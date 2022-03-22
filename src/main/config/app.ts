import express from 'express'
import { configureMiddlewares } from './middlewares'

const app = express()

configureMiddlewares(app)

export default app
