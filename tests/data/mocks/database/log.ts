import { LogErrorRepository } from '@/data/protocols'

export function mockLogErrorRepository (): LogErrorRepository {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {}
  }

  return new LogErrorRepositoryStub()
}
