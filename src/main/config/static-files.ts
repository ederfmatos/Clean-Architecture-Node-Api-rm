import express, { Express } from 'express'
import { resolve } from 'path'

export function configureStaticFiles (app: Express): void {
  app.use('/static', express.static(resolve(__dirname, '..', '..', 'static')))
}
