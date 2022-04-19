import { mockAccountModel } from '@/tests/domain/mocks'
import { AddAccount, LoadAccountByToken } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export function mockAddAccount (): AddAccount {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccount.Params): Promise<AddAccount.Response> {
      return true
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
