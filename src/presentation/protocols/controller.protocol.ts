import { HttpRequest, HttpResponse } from './http.protocol'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
