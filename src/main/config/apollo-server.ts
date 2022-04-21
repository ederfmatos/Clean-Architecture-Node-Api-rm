import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers } from '@/main/graphql/resolvers'
import { typeDefs } from '@/main/graphql/typedefs'
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

export function configureApolloServer (app: Express): void {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [
      {
        requestDidStart: async () => ({
          willSendResponse: async ({ response, errors }) => {
            handleError(response, errors, 'UserInputError', 400)
            handleError(response, errors, 'AuthenticationError', 401)
            handleError(response, errors, 'ForbiddenError', 403)
            handleError(response, errors, 'ApolloError', 500)
          }
        })
      }
    ]
  })
  void server.start().then(() => server.applyMiddleware({ app }))
}
