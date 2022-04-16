import 'module-alias/register'
import { MongoHelper } from '@/infra/database/mongodb'
import environment from './config/env'

MongoHelper.connect(environment.mongoUrl)
  .then(() => import('./config/app'))
  .then(app => app.default)
  .then(app => app.listen(environment.port, () => console.log('Server running on port', environment.port)))
  .catch(console.error)
