// eslint.config.js
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: 'readonly', // ✅ allow process.env
        __dirname: 'readonly',
        require: 'readonly',
        module: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn', // just warn
      'no-useless-catch': 'off', // disable strict rule
      'no-undef': 'off', // avoid false errors for Node built-ins
    },
  },
];
