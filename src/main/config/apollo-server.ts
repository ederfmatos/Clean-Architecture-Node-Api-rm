import { resolvers } from '@/main/graphql/resolvers'
import { typeDefs } from '@/main/graphql/typedefs'
import { plugins } from '@/main/graphql/plugins'
import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { authDirectiveTransformer } from '@/main/graphql/directives/auth-directive'

export async function configureApolloServer (app: Express): Promise<void> {
  const schema = makeExecutableSchema({ resolvers, typeDefs })

  const server = new ApolloServer({
    schema: authDirectiveTransformer(schema),
    plugins,
    context: ({ req }) => ({ req })
  })

  await server.start()
  server.applyMiddleware({ app })
}
