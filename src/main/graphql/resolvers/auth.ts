import { handleApolloServerResolver } from '@/main/adapters'
import { makeLoginController, makeSignUpController } from '@/main/factories'

const loginController = makeLoginController()
const signUpController = makeSignUpController()

export default {
  Query: {
    login: async (parent: any, args: any) => handleApolloServerResolver(loginController, args)
  },
  Mutation: {
    signUp: async (parent: any, args: any) => handleApolloServerResolver(signUpController, args)
  }
}
