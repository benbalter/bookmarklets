const { defineConfig, globalIgnores } = require('eslint/config');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = defineConfig(
  globalIgnores(['dist/', 'test-results/', 'playwright-report/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['bookmarklets/*/src/**/*.ts'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs}', 'test/**/*.ts', 'playwright.config.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['eslint.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
);
