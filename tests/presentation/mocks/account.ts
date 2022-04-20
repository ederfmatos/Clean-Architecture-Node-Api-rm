import { AddAccount, LoadAccountByToken } from '@/domain/usecases'

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
    async loadAccountByToken (token: string, role?: string): Promise<LoadAccountByToken.Response> {
      return { id: 'any_id' }
    }
  }

  return new LoadAccountByTokenStub()
}
