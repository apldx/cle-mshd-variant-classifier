module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2018
  },
  'extends': 'eslint:recommended',
  'plugins': ['jest'],
  'rules': {
    'indent': [
      'error',
      2,
      { 
        'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 3 },
        'CallExpression': { 'arguments': 1 },
        'ArrayExpression': 1,
        'ObjectExpression': 1
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-unused-vars': [
      'error',
      { 'args': 'none' }
    ]
  }
};
