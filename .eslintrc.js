/* eslint-env node */
/* eslint-disable quote-props */

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ['no-only-tests'],
  rules: {
    'no-return-await': 0,
    'class-methods-use-this': 0,
    'func-names': 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-only-tests/no-only-tests': 'error',
    'linebreak-style': 0,
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowArrowFunction: true,
        allowAnonymousClass: true,
        allowAnonymousFunction: true,
        allowCallExpression: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],
  },
  extends: [
    'eslint:recommended',
  ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
        ecmaVersion: 6,
      },
      rules: {
        eqeqeq: 0,
        'no-plusplus': 0,
        'max-len': 0,
        'max-classes-per-file': 0,
        'consistent-return': 0,
        'import/extensions': 0,
        'import/no-webpack-loader-syntax': 0,
        'no-restricted-properties': 0,
        'no-restricted-globals': 0,
        'no-mixed-operators': 0,
        'no-useless-concat': 0,
        'no-self-assign': 0,
        'default-case': 0,
        'no-var': 0,
        'no-return-assign': 0,
        'vars-on-top': 0,
        'no-sequences': 0,
        'new-cap': 0,
        'no-param-reassign': 0,
        'no-multi-assign': 0,
        'no-restricted-syntax': 0,
        'prefer-rest-params': 0,
        radix: 0,
        'no-underscore-dangle': 0,
        'operator-assignment': 0,
        'prefer-const': 0,
        'no-console': 'off',
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-throw-literal': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-shadow': 0,
        '@typescript-eslint/no-loop-func': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        '@typescript-eslint/no-useless-constructor': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/explicit-function-return-type': 'warn',

        'implicit-arrow-linebreak': 0,
        'import/no-duplicates': 0,
        'prefer-destructuring': 0,
        'no-return-await': 0,
        indent: [
          'error',
          2,
          {
            SwitchCase: 1,
            MemberExpression: 1,
            CallExpression: {
              arguments: 1,
            },
          },
        ],
      },
    },
    {
      files: [
        'src/**/*.*',
      ],
      globals: {
        DevExpress: true,
      },
    },
    {
      files: ['*.ts'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      rules: {
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: {
              memberTypes: [
                'public-decorated-field',
                'protected-decorated-field',
                'private-decorated-field',
                'public-decorated-method',
                'protected-decorated-method',
                'private-decorated-method',
                'field',
                'constructor',
                'static-method',
                'instance-method',
                'abstract-method',
              ],
            },
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
      ],
      rules: {},
    },
    {
      files: [
        'utils/*.*',
      ],
      globals: {
        DevExpress: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 0,
        'no-console': 0,
      },
    },
  ],
};
