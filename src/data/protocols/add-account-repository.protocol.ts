import { AccountModel } from '../../domain/models/account.model'
import { AddAccountModel } from '../../domain/usecases/add-account.usecase'

export interface AddAccountRepository {
  add: (addAccountModel: AddAccountModel) => Promise<AccountModel>
}
