import { Router } from 'express'
import { handleExpressRoute } from '../adapters/express/express-route.adapter'
import { makeLoginController } from '../factories/controllers/login/login.factory'
import { makeSignUpController } from '../factories/controllers/signup/signup.factory'

export default (router: Router): void => {
  router.post('/signup', handleExpressRoute(makeSignUpController()))
  router.post('/login', handleExpressRoute(makeLoginController()))
}
