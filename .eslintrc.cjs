/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  overrides: [
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}", "cypress/support/**/*.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"]
    }
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    quotes: "error"
  },
  env: {
    browser: true // using this environment makes it so ESLint will not throw errors related to the browser
  }
}
