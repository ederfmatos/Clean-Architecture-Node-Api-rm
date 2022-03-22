const config = require('./jest.config')

module.exports = {
  ...config,
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.test.ts']
}
