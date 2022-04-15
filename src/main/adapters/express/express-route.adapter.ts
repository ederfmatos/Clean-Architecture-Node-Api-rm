import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export function handleExpressRoute (controller: Controller) {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      account: request.account
    }

    const { body, statusCode }: HttpResponse = await controller.handle(httpRequest)
    if (statusCode >= 200 && statusCode <= 299) {
      return response.status(statusCode).json(body)
    }

    return response.status(statusCode)
      .json({ error: body.message })
  }
}
