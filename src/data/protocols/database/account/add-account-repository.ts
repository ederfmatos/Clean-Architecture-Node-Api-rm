import { AccountModel } from '@/domain/models'

export interface AddAccountRepository {
  add: (addAccountModel: AddAccountRepository.Params) => Promise<AddAccountRepository.Response>
}

export namespace AddAccountRepository {
  export type Params = {
    name: string
    email: string
    password: string
    accessToken?: string
  }

  export type Response = AccountModel
}
