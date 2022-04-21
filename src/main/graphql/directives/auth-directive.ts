import { makeAuthMiddleware } from '@/main/factories'

import { GraphQLSchema } from 'graphql'
import { ForbiddenError } from 'apollo-server-express'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'

export const authDirectiveTransformer = (schema: GraphQLSchema): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')

      if (!authDirective) {
        return fieldConfig
      }

      const { resolve } = fieldConfig

      fieldConfig.resolve = async (parent, args, context, info) => {
        const request = { accessToken: context?.req?.headers?.['x-access-token'] }
        const httpResponse = await makeAuthMiddleware().handle(request)

        if (httpResponse.statusCode === 200) {
          Object.assign(context?.req, httpResponse.body)
          return resolve.call(this, parent, args, context, info)
        }

        throw new ForbiddenError(httpResponse.body.message)
      }
    }
  })
}
