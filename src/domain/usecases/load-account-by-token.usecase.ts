import { AccountModel } from '../models/account.model'

export interface LoadAccountByToken {
  loadAccountByToken: (token: string, role?: string) => Promise<AccountModel>
}
