import { AccountModel } from '@/domain/models'

export type LoadAccountResponse = AccountModel

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadAccountResponse>
}
