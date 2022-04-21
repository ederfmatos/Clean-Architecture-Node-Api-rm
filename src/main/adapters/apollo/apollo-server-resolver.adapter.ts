import { Controller } from '@/presentation/protocols'
import { ApolloError, AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-express'

export async function handleApolloServerResolver (controller: Controller, args?: any): Promise<any> {
  const request = {
    ...(args || {})
  }

  const httpResponse = await controller.handle(request)

  switch (httpResponse.statusCode) {
    case 200:
    case 204: return httpResponse.body
    case 400: return new UserInputError(httpResponse.body.message)
    case 401: return new AuthenticationError(httpResponse.body.message)
    case 403: return new ForbiddenError(httpResponse.body.message)
    default: return new ApolloError(httpResponse.body.message)
  }
}
