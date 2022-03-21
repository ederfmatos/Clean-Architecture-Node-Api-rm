import { HttpResponse } from '../protocols/http.protocol'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
