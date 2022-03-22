import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'

export function handleExpressRoute (controller: Controller) {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }

    const { body, statusCode }: HttpResponse = await controller.handle(httpRequest)

    return response.status(statusCode).json(body)
  }
}
