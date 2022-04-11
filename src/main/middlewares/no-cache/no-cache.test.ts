import request from 'supertest'
import app from '@/main/config/app'
import { noCache } from './no-cache'

describe('NoCache Middleware', () => {
  test('should disable cache', async () => {
    app.get('/test_no_cache', noCache, (request, response) => response.send())

    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
