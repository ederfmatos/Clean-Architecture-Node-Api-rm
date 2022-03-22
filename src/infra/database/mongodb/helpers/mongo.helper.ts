import { Collection, InsertOneResult, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map<Response>(mongoResult: InsertOneResult, model: any): Response {
    const response = {
      id: mongoResult.insertedId.toString(),
      ...model
    }

    delete response._id

    return response
  }

}
