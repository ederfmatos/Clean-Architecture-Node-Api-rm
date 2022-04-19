import { HttpResponse } from './http.protocol'

export interface Middleware {
  handle: (request: any) => Promise<HttpResponse>
}
