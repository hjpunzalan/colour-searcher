module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'
  ],
  overrides: [
    // Only use Testing Library lint rules in jest test files
    {
      files: ['__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ],
  plugins: ['react', 'testing-library', 'jest-dom', 'prettier', '@typescript-eslint'],
  rules: { 'react/react-in-jsx-scope': 'off' },
  settings: {
    react: {
      version: 'detect'
    },

    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};
