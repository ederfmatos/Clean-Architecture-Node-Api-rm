import { mockAccountModel } from '@/tests/domain/mocks'
import { AddAccount, AddAccountParams, LoadAccountByToken } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

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
