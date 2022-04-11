import * as components from './components'
import { loginPath } from './paths'
import { accountSchema, errorSchema, loginInputSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do Rodrigo Manguinho para realizar enquetes entre programadores',
    version: '1.0.0',
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [
    { url: '/api' }
  ],
  tags: [
    { name: 'Auth' }
  ],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginInput: loginInputSchema,
    error: errorSchema
  },
  components
}
