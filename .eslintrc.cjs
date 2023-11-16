module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended', 
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  settings: {
    "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
    'import/resolver':{
        typescript: true,
        node: true
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "indent": ["error", 4, { "SwitchCase": 1 }],
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-single"],
    "semi": ["error", "always"],
    "import/order": [
        "error",
        {
          "groups": [["builtin", "external", "internal"], "parent", "sibling", "index"],
          "newlines-between": "always",
        },
    ],
    "import/no-unresolved": "error"
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
}
