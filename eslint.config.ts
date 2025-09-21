import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js, import: eslintPluginImport },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["type"],
        },
      ],
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // Final override: ensure legacy JSX-in-scope rules are disabled and React settings are detected
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
    settings: {
      react: {
        version: "detect",
        // prefer automatic runtime (no need to import React for JSX)
        jsxRuntime: "automatic",
      },
    },
  },
  globalIgnores([
    ".react-router/",
    "lib/",
    "node_modules/",
    "dist/",
    "build/",
    "public/",
  ]),
]);
