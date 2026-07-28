import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import svelte from "ultracite/oxlint/svelte";

export default defineConfig({
  extends: [core, svelte],
  ignorePatterns: [...core.ignorePatterns, "src/lib/index.ts"],
  rules: {
    "eslint/func-style": "off",
    "eslint/require-unicode-regexp": "off",
    "eslint/sort-keys": "off",
    "unicorn/filename-case": "off",
  },
  overrides: [
    {
      files: ["**/*.svelte"],
      rules: {
        "eslint/no-unassigned-vars": "off",
        "eslint/no-use-before-define": "off",
        "eslint/prefer-const": "off",
        "eslint/prefer-destructuring": "off",
        "promise/prefer-await-to-callbacks": "off",
        "promise/prefer-await-to-then": "off",
      },
    },
    {
      files: ["scripts/check-production-build.js"],
      rules: {
        "eslint/no-await-in-loop": "off",
        "unicorn/import-style": "off",
      },
    },
  ],
});
