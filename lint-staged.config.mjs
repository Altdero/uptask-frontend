/** @type {import('lint-staged').Config} */
const config = {
  // Run tsc on the whole project (type checking)
  // "**/*.{ts,tsx}": () => "tsc --noEmit",
  // Lint and fix TypeScript/JavaScript files
  "*.{js,jsx,ts,tsx,mjs}": ["prettier --write", "eslint --fix"],
  // Format other files
  "*.{json,md,css,yml,yaml}": ["prettier --write"],
};

export default config;
