import { AddAccount } from '@/domain/usecases'

export function mockAddAccountParams (): AddAccount.Params {
  return {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}
