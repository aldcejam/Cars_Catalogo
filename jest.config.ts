import type {Config} from 'jest';

const config: Config = { 
  bail: true, 
  clearMocks: true, 
  coverageProvider: "v8", 
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    '^@errors/(.*)$': '<rootDir>/src/infrastructure/http/errors/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@shared/(.*)$': '<rootDir>/src/infrastructure/shared/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
  }, 
  preset: "ts-jest", 
  testMatch: [
    "**/?(*.)+(spec|test).ts",
    "**/*.spec.ts",
    "**/*.test.ts"
  ], 
};

export default config;
