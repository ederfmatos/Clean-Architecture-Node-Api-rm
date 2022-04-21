import { handleApolloServerResolver } from '@/main/adapters'
import { makeLoginController } from '@/main/factories'

const loginController = makeLoginController()

export default {
  Query: {
    login: async (parent: any, args: any) => handleApolloServerResolver(loginController, args)
  }
}
