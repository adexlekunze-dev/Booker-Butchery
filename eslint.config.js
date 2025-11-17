// ESLint config for Next.js 15
const { defineConfig } = require("eslint/config");
const nextConfig = require("eslint-config-next/core-web-vitals");

module.exports = defineConfig([
  ...nextConfig,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
]);
