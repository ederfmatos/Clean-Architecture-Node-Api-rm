import { Controller } from '@/presentation/protocols'

export async function handleApolloServerResolver (controller: Controller, args): Promise<any> {
  const httpResponse = await controller.handle(args)
  return httpResponse.body
}
