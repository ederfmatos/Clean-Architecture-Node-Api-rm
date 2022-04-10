import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account.usecase'
import { AccountModel } from '@/domain/models/account.model'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token.usecase'

export function mockAddAccount (): AddAccount {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return mockAccountModel()
    }
  }

  return new AddAccountStub()
}

export function mockLoadAccountByToken (): LoadAccountByToken {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async loadAccountByToken (token: string, role?: string): Promise<AccountModel> {
      return mockAccountModel()
    }
  }

  return new LoadAccountByTokenStub()
}
