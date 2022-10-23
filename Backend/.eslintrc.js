module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:node/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 13,
  },
  rules: {
    'operator-linebreak': 'off',
    'linebreak-style': 0,
    'no-restricted-syntax': 0,
    'max-len': ['error', { code: 120 }],
    'no-useless-concat': 1,
    'consistent-return': 'off',
    indent: ['error', 2, { offsetTernaryExpressions: true, SwitchCase: 1 }],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, minProperties: 5, consistent: true },
        ObjectPattern: { multiline: true, minProperties: 5 },
        ImportDeclaration: { multiline: true, minProperties: 4 },
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
  },
};
