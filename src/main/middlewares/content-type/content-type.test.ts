import request from 'supertest'
import app from '../../config/app'

describe('Content Type Middleware', () => {
  test('should return default content-type as json', async () => {
    app.get('/content-type', (request, response) => response.send(''))

    await request(app)
      .get('/content-type')
      .expect('content-type', /json/)
  })

  test('should return xml content-type when forced', async () => {
    app.get('/content-type-xml', (request, response) => {
      response.type('xml')
      return response.send('')
    })

    await request(app)
      .get('/content-type-xml')
      .expect('content-type', /xml/)
  })
})
