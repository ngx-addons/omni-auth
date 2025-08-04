const baseConfig = require('../../eslint.config.js');
const tseslint = require("typescript-eslint");

module.exports =  tseslint.config([
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'demo',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'demo',
          style: 'kebab-case',
        },
      ],
    },
  },
]);
