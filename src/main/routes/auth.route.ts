import { Router } from 'express'
import { handleExpressRoute } from '@/main/adapters/express/express-route.adapter'
import { makeLoginController } from '@/main/factories/controllers/auth/login/login.factory'
import { makeSignUpController } from '@/main/factories/controllers/auth/signup/signup.factory'

export default (router: Router): void => {
  router.post('/signup', handleExpressRoute(makeSignUpController()))
  router.post('/login', handleExpressRoute(makeLoginController()))
}
