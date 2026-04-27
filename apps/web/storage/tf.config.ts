import { defineConfig } from "taskforge-cli/config";

export default defineConfig({
  envDir: "../../../",
  scripts: {
    dev: {
      execute: "tsx --watch src/index.ts",
      envFile: ".env.development",
    },
    start: {
      execute: "node ./dist/index.cjs",
      envFile: ".env.development",
      envValues: {
        NODE_ENV: "production",
      },
    },
  },
});
