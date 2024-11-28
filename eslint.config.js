module.exports = {
root: true,
ignorePatterns: ["node_modules/", "dist/"],
plugins: ["prettier"],
extends: ["plugin:prettier/recommended"],
parserOptions: {
      project: "./tsconfig.json"
    },
    rules: {
      "prettier/prettier": "error"
    }
  }