module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'jest'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
    "import/ignore": [".css$"]
  },
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts', '**/setupTests.js', '**/*.stories.tsx'] }],
    '@typescript-eslint/indent': [2, 2],
    'import/extensions': 0,
    'sort-imports': 0,
    "simple-import-sort/sort": "error",
    'no-multiple-empty-lines': "error",
    'no-shadow': 0,
    'max-len': [2, { "code": 150, "ignoreComments": true }],
    "jsx-a11y/anchor-is-valid": "warn",
    "no-plusplus": 1,
    "no-extra-semi": 0,
    "no-param-reassign": 1,
    "prefer-destructuring": 1,
    "react/no-did-update-set-state": 1,
    "jsx-a11y/heading-has-content": 1,
    "import/prefer-default-export": 1,
    "import/no-named-as-default-member": 1,
    "no-underscore-dangle": 1,
    "no-tabs": ["warn", { "allowIndentationTabs": true }],
    "no-continue": 1,
    "sort-imports": "off",
    "import/order": "off",
    "import/first": "off"
  },
  "env": {
    "jest/globals": true,
    "browser": true
  }
};
