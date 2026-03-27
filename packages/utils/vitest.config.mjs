import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  defineConfig({
    test: {
      globals: true,
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      exclude: ["src/tests/e2e/**/*.ts", "src/tests/e2e/**/*.test.tsx"],
      environment: "jsdom",
    },
  }),
);
