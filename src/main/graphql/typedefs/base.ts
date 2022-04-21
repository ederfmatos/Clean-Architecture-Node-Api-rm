import { gql } from 'apollo-server-express'

export default gql`
  scalar DateTime

  directive @auth on FIELD_DEFINITION

  type Query {
    health: String
  }

  type Mutation {
    health: String
  }
`
