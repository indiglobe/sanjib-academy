import { defineConfig } from "taskforge-cli/config";

export default defineConfig({
  envDir: "../../../",
  scripts: {
    "serve:app": {
      execute: "node dist/server/index.mjs",
      envFile: ".env.production",
    },
    "dev:app": {
      execute: "vite dev",
      envFile: ".env.development",
    },
  },
});
