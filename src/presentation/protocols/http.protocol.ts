export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest = {
  params?: any
  body?: any
  headers?: Record<string, any>
  account?: {
    id: string
  }
}
