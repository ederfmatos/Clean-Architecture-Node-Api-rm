import { Collection, InsertOneResult, MongoClient, WithId } from 'mongodb'

type CollectionName = 'accounts' | 'errors' | 'surveys' | 'survey-results'

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

  async  getCollection <CollectionType = any>(name: CollectionName): Promise<Collection<CollectionType>> {
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
  },

  mapResult<Response>(mongoResult: WithId<any>): Response {
    if (!mongoResult) {
      return null
    }

    const response = {
      id: mongoResult._id,
      ...mongoResult
    }

    delete response._id

    return response
  }

}
