// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    semi: ['error', 'always'], 
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    'no-console': 'error', 
    'max-len': ['warn', { code: 121 }], 
    indent: ['error', 2],
  },
};
