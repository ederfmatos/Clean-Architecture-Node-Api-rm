import { AccountModel } from '@/domain/models'

export type AddAccountParams = Omit<AccountModel, 'id'>

export type AddAccount = {
  add: (account: AddAccountParams) => Promise<AccountModel>
}
