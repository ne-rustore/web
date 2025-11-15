/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  trailingComma: 'none',
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],

  importOrder: [
    '<TYPES>',
    '',
    '^react$',
    '^next(/.*|$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '^[./]',
    '',
    '.s?css$'
  ],

  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],

  importOrderTypeScriptVersion: '5.0.0',

  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true
};
