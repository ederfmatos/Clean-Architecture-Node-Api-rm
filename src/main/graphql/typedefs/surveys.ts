import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    surveys: [Survey!]! @auth
  }

  type Survey {
    id: ID!
    question: String!
    answers: [Answer!]!
    date: DateTime!
    didAnswer: Boolean!
  }

  type Answer {
    image: String
    answer: String!
  }
`
