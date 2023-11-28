import type {Config} from 'jest';

const config: Config = { 
  bail: true, 
  clearMocks: true, 
  coverageProvider: "v8", 
  moduleNameMapper: {
    '^@errors/(.*)$': '<rootDir>/src/errors/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  }, 
  preset: "ts-jest", 
  testMatch: [
    "**/?(*.)+(spec|test).ts",
    "**/*.spec.ts",
    "**/*.test.ts"
  ], 
};

export default config;
