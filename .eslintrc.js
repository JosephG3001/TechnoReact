module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  overrides: [
    {
      files: ["**/*.test.tsx"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/extensions": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-debugger": "warn",
    "no-shadow": "off",
    "no-plusplus": [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "@typescript-eslint/no-shadow": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-param-reassign": ["error", { props: false }],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        controlComponents: ["InputCheckbox"],
      },
    ],
    "react/require-default-props": [
      "error",
      { ignoreFunctionalComponents: true },
    ],
    "react/jsx-props-no-spreading": "off",
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/prop-types": "off",
  },
};
