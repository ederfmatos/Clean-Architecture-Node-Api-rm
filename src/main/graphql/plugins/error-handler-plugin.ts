import { PluginDefinition } from 'apollo-server-core'
import { GraphQLResponse } from 'apollo-server-types'
import { GraphQLError } from 'graphql'

function matchError (error: GraphQLError, errorName: string): boolean {
  return [error.name, error.originalError?.name].includes(errorName)
}

function handleError (response: GraphQLResponse, errors: readonly GraphQLError[], errorName: string, httpStatus: number): void {
  if (errors?.some(error => matchError(error, errorName))) {
    response.data = undefined
    response.http.status = httpStatus
  }
}

export const errorHandlerPlugin: PluginDefinition = {
  requestDidStart: async () => ({
    willSendResponse: async ({ response, errors }) => {
      handleError(response, errors, 'UserInputError', 400)
      handleError(response, errors, 'AuthenticationError', 401)
      handleError(response, errors, 'ForbiddenError', 403)
      handleError(response, errors, 'ApolloError', 500)
    }
  })
}
