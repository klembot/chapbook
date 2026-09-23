import js from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error"],
      'comma-dangle': 0,
      curly: [2, 'all'],
      'newline-after-var': [2, 'always'],
      'no-console': [2, {allow: ['warn']}],
      'no-extra-semi': 0,
      'no-mixed-spaces-and-tabs': 0,
      'no-trailing-spaces': [2, {skipBlankLines: true}],
      "no-useless-assignment": "off",
      'quote-props': 0,
      semi: [2, 'always']
    }
  },
  eslintConfigPrettier
]);
