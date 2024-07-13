/// <reference types="vitest" />

import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    includeSource: ["src/**/*.test.{js,ts,tsx}"],
    coverage: {
      exclude: ["**/node_modules/**", "**/dist/**", "**/*.{mjs,astro}"],
      ignoreEmptyLines: true,
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80
      }
    }
  }
});
