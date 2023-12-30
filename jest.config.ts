import type { Config } from 'jest';

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts?(x)'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/', '/public', '*.js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true,
        isolatedModules: true,
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!music-metadata/)'],
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
    '^@components/(.*)': '<rootDir>/src/renderer/src/components/$1',
    '^@database/(.*)': '<rootDir>/src/database/$1',
    '^@layouts/(.*)': '<rootDir>/src/renderer/src/layouts/$1',
    '^@lib/(.*)': '<rootDir>/src/lib/$1',
    '^@utilities/(.*)': '<rootDir>/src/utilities/$1',
    '^@renderer/(.*)': '<rootDir>/src/renderer/$1',
    '^@store/(.*)': '<rootDir>/src/renderer/src/store/$1',
    '^typings/(.*)': '<rootDir>/src/types/$1',
  },
};

export default config;
