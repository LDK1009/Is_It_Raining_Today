module.exports = {
  root: true,
  extends: [
    'expo',
    '@react-native-community',
    '@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-native',
    'import',
    'prettier'
  ],
  rules: {
    // Prettier 관련
    'prettier/prettier': ['error', {
      semi: false,
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      bracketSpacing: true,
      endOfLine: 'auto'
    }],

    // TypeScript 관련 (웹 개발자 친화적)
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',

    // React 관련
    'react/prop-types': 'off', // TypeScript 사용으로 불필요
    'react/react-in-jsx-scope': 'off', // React 17+ 자동 import
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // React Native 특화
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off',

    // Import 관련 (웹과 동일한 패턴)
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal'
          },
          {
            pattern: '../**',
            group: 'parent'
          },
          {
            pattern: './**',
            group: 'sibling'
          }
        ],
        pathGroupsExcludedImportTypes: ['react']
      }
    ],
    'import/no-unresolved': 'off', // React Native resolver 이슈
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'off',

    // 일반 코딩 스타일 (웹과 동일)
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // 코드 품질
    'complexity': ['warn', 10],
    'max-depth': ['warn', 4],
    'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
    'max-params': ['warn', 4],

    // 네이밍 컨벤션 (웹 스타일)
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE']
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase']
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE']
      }
    ]
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      'babel-module': {
        root: ['./src'],
        alias: {
          '@': './src'
        }
      }
    }
  },
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    __DEV__: 'readonly',
    fetch: 'readonly'
  }
} 