import { Request, Response, Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', (request: Request, response: Response) => {
    response.json({ ok: true })
  })
}
