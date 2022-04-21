import { gql } from 'apollo-server-express'

export default gql`
  scalar DateTime
  
  type Query {
    health: String
  }

  type Mutation {
    health: String
  }
`
