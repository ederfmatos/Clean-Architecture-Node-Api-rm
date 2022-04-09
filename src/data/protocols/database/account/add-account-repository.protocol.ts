import { AccountModel } from '@/domain/models/account.model'
import { AddAccountModel } from '@/domain/usecases/account/add-account.usecase'

export interface AddAccountRepository {
  add: (addAccountModel: AddAccountModel) => Promise<AccountModel>
}
