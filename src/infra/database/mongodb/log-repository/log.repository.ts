import { LogErrorRepository } from '@/data/protocols/database/log/log-error-repository.protocol'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
