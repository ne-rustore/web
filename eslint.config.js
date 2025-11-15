import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import * as resolverNode from 'eslint-import-resolver-node';
import * as resolverTS from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', '.next', 'node_modules'] },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser,
      globals: { ...globals.browser, ...globals.node }
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: resolverTS.resolve,
        node: resolverNode.resolve
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],

      'import/order': 'off',
      'import/no-unresolved': 'error'
    }
  }
);
