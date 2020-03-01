const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),

  moduleFileExtensions: ['js', 'ts'],

  moduleNameMapper: {
    '^@tenbot/(.*)$': '<rootDir>/packages/$1/src',
  },

  testMatch: ['<rootDir>/packages/*/test/**/*.spec.ts'],

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  transformIgnorePatterns: ['/node_modules/'],

  // coverage config
  collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.ts'],
  coverageDirectory: 'coverage',
};
