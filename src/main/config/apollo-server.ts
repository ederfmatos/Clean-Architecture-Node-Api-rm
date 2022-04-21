import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers } from '@/main/graphql/resolvers'
import { typeDefs } from '@/main/graphql/typedefs'

export function configureApolloServer (app: Express): void {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })
  void server.start().then(() => server.applyMiddleware({ app }))
}
