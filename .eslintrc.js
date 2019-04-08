module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    // mocha: true,
    // jest: true,
    // jasmine: true,
  },
  globals: {
    DEV_TYPE: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-wrap-multilines': 0,
    // alias
    'import/no-unresolved': 0,
    // 结构
    'react/destructuring-assignment': 1,
    // prop-types
    'react/forbid-prop-types': 0,
    'react/no-unused-prop-types': 0,
    'react/prop-types': 2,
    // clg
    'no-console': 0,
    'no-plusplus': 0,
    'react/no-array-index-key': 0,
    // 'no-eval': 0,
    // 'no-unused-expressions': 0,
    // 'no-debugger': 0,
    // 'no-unused-vars': 0,
    // 'jsx-a11y/no-static-element-interactions': 0,
    // 'react/forbid-prop-types': 0,
    // 'react/jsx-one-expression-per-line': 0,
    // 'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    // 'import/no-extraneous-dependencies': [
    //   2,
    //   {
    //     optionalDependencies: true,
    //     devDependencies: ['**/tests/**.js', '/mock/!**!/!**.js', '**/!**.test.js'],
    //   },
    // ],
    // 'import/prefer-default-export': 0,
    // 'no-restricted-syntax': 0,
    // 'no-await-in-loop': 0,
    // 'no-loop-func': 0,
    // 'no-continue': 0,
    // 'class-methods-use-this': 0,
    // 'jsx-a11y/no-noninteractive-element-interactions': 0,
    // 'jsx-a11y/click-events-have-key-events': 0,
    // 'jsx-a11y/no-static-element-interactions': 0,
    // 'jsx-a11y/anchor-is-valid': 0,
    // 'linebreak-style': 0,
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};
