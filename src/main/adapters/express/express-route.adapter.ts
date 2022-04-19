import { Request, Response } from 'express'
import { Controller, HttpResponse } from '@/presentation/protocols'

export function handleExpressRoute (controller: Controller) {
  return async (expressRequest: Request, expressResponse: Response) => {
    const request = {
      ...(expressRequest.body || {}),
      ...(expressRequest.params || {}),
      accountId: expressRequest.account?.id
    }

    const { body, statusCode }: HttpResponse = await controller.handle(request)
    if (statusCode >= 200 && statusCode <= 299) {
      return expressResponse.status(statusCode).json(body)
    }

    return expressResponse.status(statusCode)
      .json({ error: body.message })
  }
}
