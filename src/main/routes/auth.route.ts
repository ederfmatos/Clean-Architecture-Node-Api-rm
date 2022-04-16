import { handleExpressRoute } from '@/main/adapters'
import { makeLoginController, makeSignUpController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', handleExpressRoute(makeSignUpController()))
  router.post('/login', handleExpressRoute(makeLoginController()))
}
