import { HttpResponse } from './http.protocol'

export interface Controller<Request = any> {
  handle: (request: Request) => Promise<HttpResponse>
}
