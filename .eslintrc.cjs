module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
  ],
  rules: {
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'react/prop-types': 'off',
    curly: ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['src/renderer/**/*.ts', 'src/renderer/**/*.tsx'],
      parserOptions: {
        project: './tsconfig.web.json',
      },
    },
    {
      files: [
        'src/main/*',
        'src/preload/*',
        'src/lib/**/*.ts',
        'src/database/**/*.ts',
        'test/**/*.ts',
        '*.test.*',
      ],
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
    {
      files: ['*.test.*', '*.spec.*'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:jest/all'],
      rules: {
        'jest/no-hooks': 'off',
        'jest/prefer-spy-on': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'local',
            args: 'after-used',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    {
      files: ['*.cy.*', 'cypress/support/*.ts'],
      extends: ['plugin:cypress/recommended'],
      plugins: ['cypress'],
      env: {
        'cypress/globals': true,
      },
    },
    {
      files: ['cypress/support/*.ts'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
  ],
};
