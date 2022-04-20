import { LoadAccountByTokenRepository, AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'

export function mockAddAccountRepository (): AddAccountRepository {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccountModel: AddAccountRepository.Params): Promise<AddAccountRepository.Response> {
      return true
    }
  }

  return new AddAccountRepositoryStub()
}

export function mockLoadAccountByEmailRepository (): LoadAccountByEmailRepository {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Response> {
      return {
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password'
      }
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

export function mockLoadAccountByTokenRepository (): LoadAccountByTokenRepository {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Response> {
      return { id: 'any_id' }
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export function mockUpdateAccessTokenRepository (): UpdateAccessTokenRepository {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (accountId: string, accessToken: string): Promise<void> {

    }
  }

  return new UpdateAccessTokenRepositoryStub()
}
