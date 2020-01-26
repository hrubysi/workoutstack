module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    '@vue/standard',
    'plugin:vue/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'space-before-function-paren': ['error', 'never'],
    'vue/no-unused-components': 'off',
    'comma-dangle': ['error', 'always-multiline'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
