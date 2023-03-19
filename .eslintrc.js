module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true, es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard'
  ],
  globals: {
    Atomics: 'readonly', SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      globalReturn: false, impliedStrict: true, jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'unused-imports'
  ],
  rules: {
    eqeqeq: 'error',
    'no-eval': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-unused-expressions': 'warn',
    'react/jsx-filename-extension': [
      1, {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }],
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    camelcase: 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    indent: ['error', 2, {
      SwitchCase: 1,
      offsetTernaryExpressions: true,
      // from: https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
      ignoredNodes: [
        'JSXElement',
        'JSXElement :not(JSXExpressionContainer, JSXExpressionContainer *)',
        'JSXAttribute',
        'JSXIdentifier',
        'JSXNamespacedName',
        'JSXMemberExpression',
        'JSXSpreadAttribute',
        'JSXOpeningElement',
        'JSXClosingElement',
        'JSXFragment',
        'JSXOpeningFragment',
        'JSXClosingFragment',
        'JSXText',
        'JSXEmptyExpression',
        'JSXSpreadChild'
      ]
    }],
    'react/jsx-indent': ['error', 2, { checkAttributes: false, indentLogicalExpressions: true }],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never'
    }],
    'react/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line'
    }],
    'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
    'react/jsx-curly-newline': ['error', {
      multiline: 'consistent',
      singleline: 'consistent'
    }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error', {
        multiline: {
          delimiter: 'none', requireLast: true
        },
        singleline: {
          delimiter: 'semi', requireLast: false
        }
      }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/dist'],
            message: 'Don\'t import from dist',
            allowTypeImports: false
          }
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: ['*.test.ts', '*.test.tsx'], env: { jest: true }
    }
  ]
}
