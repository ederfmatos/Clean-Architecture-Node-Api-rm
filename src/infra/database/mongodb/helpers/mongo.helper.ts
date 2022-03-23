import { Collection, InsertOneResult, MongoClient } from 'mongodb'

type CollectionName = 'accounts' | 'errors'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: CollectionName): Promise<Collection> {
    if (this.client === null) {
      await this.connect(this.url)
    }

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
