import { AccountModel } from '@/domain/models'

export interface LoadAccountByToken {
  loadAccountByToken: (token: string, role?: string) => Promise<AccountModel>
}
