import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// "all-in-one" recommended configuration
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import prettierConfigCustom from "./prettier.config.mjs";

export default defineConfig([
  // GLOBAL IGNORES (Must be first)
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    "public/**",
    "next-env.d.ts",
  ]),

  // SPREAD NEXT.JS CONFIGS
  ...nextVitals,
  ...nextTs,

  // DISABLE CONFLICTING RULES
  eslintPluginPrettierRecommended,

  // OVERRIDE THE RULE TO FORCE CUSTOM CONFIG PATH
  {
    rules: {
      "prettier/prettier": ["error", prettierConfigCustom],
    },
  },
]);
