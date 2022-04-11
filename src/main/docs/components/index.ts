import { badRequest } from './badRequest'
import { forbidden } from './forbidden'
import { notFound } from './notFound'
import { securitySchemes } from './security'
import { serverError } from './serverError'
import { unauthorized } from './unauthorized'

export const components = {
  securitySchemes,
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized
}
