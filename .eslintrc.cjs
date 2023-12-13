module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // 'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-explicit-any': ['off'],
    "import/extensions": 0,
    "semi": [1, "always"],
    "import/no-unresolved": [0],
    "quotes": [1, "single", {
      "allowTemplateLiterals": true
    }],
    '@typescript-eslint/ban-ts-comment': ['off'],
    "linebreak-style": [0],
    "comma-dangle": [1, "never"],
    "import/prefer-default-export": 0,
    "no-console": 0,
    "global-require": "off"
  },
}
