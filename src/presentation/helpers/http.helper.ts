import { InternalServerError } from '../errors/internal-server-error.error'
import { HttpResponse } from '../protocols/http.protocol'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new InternalServerError()
})
