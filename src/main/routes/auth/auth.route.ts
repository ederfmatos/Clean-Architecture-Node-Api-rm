import { Router } from 'express'
import { handleExpressRoute } from '../../adapters/express/express-route.adapter'
import { makeSignUpController } from '../../factories/signup/signup.factory'

export default (router: Router): void => {
  router.post('/signup', handleExpressRoute(makeSignUpController()))
}
