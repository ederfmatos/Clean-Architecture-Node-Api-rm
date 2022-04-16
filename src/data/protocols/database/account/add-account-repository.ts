import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'

export type AddAccountModel = AddAccountParams

export interface AddAccountRepository {
  add: (addAccountParams: AddAccountModel) => Promise<AccountModel>
}
