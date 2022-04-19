import { NextFunction, Request, Response } from 'express'
import { HttpResponse, Middleware } from '@/presentation/protocols'

export function handleExpressMiddleware (middleware: Middleware) {
  return async (expressRequest: Request, expressResponse: Response, next: NextFunction) => {
    const request = {
      ...(expressRequest.headers),
      accessToken: expressRequest.headers['x-access-token']
    }

    const { body, statusCode }: HttpResponse = await middleware.handle(request)
    if (statusCode === 200) {
      Object.assign(expressRequest, body)
      return next()
    }

    return expressResponse
      .status(statusCode)
      .json({ error: body.message })
  }
}
