import { NextFunction, Request, Response } from 'express'
import { HttpRequest, HttpResponse, Middleware } from '../../../presentation/protocols'

export function handleExpressMiddleware (middleware: Middleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: request.headers
    }

    const { body, statusCode }: HttpResponse = await middleware.handle(httpRequest)
    if (statusCode === 200) {
      Object.assign(request, body)
      return next()
    }

    return response
      .status(statusCode)
      .json({ error: body.message })
  }
}
