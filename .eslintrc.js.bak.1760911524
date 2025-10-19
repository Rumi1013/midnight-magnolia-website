module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["@typescript-eslint", "import"],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    // Other rules...
    "import/no-cycle": ["error", { maxDepth: Number.POSITIVE_INFINITY, ignoreExternal: true }],
    "@typescript-eslint/no-unused-vars": "warn",
    // Add any project-specific rules here
  },
  ignorePatterns: ["node_modules/", ".next/", "out/", "build/"],
}
