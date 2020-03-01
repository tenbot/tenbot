module.exports = {
  root: true,

  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/standard',
    'prettier/@typescript-eslint',
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'prettier'],

  rules: {
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'prettier/prettier': 'error',
  },

  overrides: [
    {
      files: ['*.js'],

      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },

    {
      files: ['packages/*/test/**/*.spec.ts'],
      env: {
        jest: true,
      },

      extends: ['plugin:jest/recommended', 'plugin:jest/style'],

      rules: {
        'import/no-extraneous-dependencies': 'off',

        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
