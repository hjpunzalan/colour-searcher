module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // to prevent non-test files from being interpreted as test files
  testRegex: '\\.test\\.[jt]sx?$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};
