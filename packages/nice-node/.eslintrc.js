module.exports = {
  extends: ['eslint-config-qunar-typescript-node'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false,
      varsIgnorePattern: 'should'
    }]
  }
};
