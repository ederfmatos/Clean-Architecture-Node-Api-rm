import request from 'supertest'
import app from '@/main/config/app'

describe('BodyParser Middleware', () => {
  test('should parse body as json', async () => {
    app.post('/body-parser', (request, response) => response.send(request.body))

    await request(app)
      .post('/body-parser')
      .send({ name: 'Eder' })
      .expect({ name: 'Eder' })
  })
})
