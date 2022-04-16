import { Request, Response, NextFunction } from 'express'

export function contentType (request: Request, response: Response, next: NextFunction): void {
  response.type('json')
  next()
}
