import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    health: String
  }

  type Mutation {
    health: String
  }
`
