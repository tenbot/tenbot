module.exports = {
  root: true,
  extends: ['@meteorlxy/prettier'],
  overrides: [
    {
      files: ['*.ts'],
      extends: '@meteorlxy/prettier-typescript',
      parserOptions: {
        project: ['tsconfig.eslint.json'],
      },
      rules: {
        'no-console': 'off',
        'class-methods-use-this': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.spec.ts'],
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
