import { defineConfig } from "taskforge-cli/config";

export default defineConfig({
  envDir: "./",
  scripts: {
    "serve:app": {
      execute: "node dist/server/index.mjs",
      envFile: ".env.production",
    },
    "dev:app": {
      execute: "vite dev",
      envFile: ".env.development",
    },
    "db:generate": { execute: "drizzle-kit generate" },
    "db:migrate": { execute: "drizzle-kit migrate" },
    "db:pull": { execute: "drizzle-kit pull" },
    "db:push:dev": {
      execute: "drizzle-kit push",
      envFile: ".env.development",
    },
    "db:setup:dev": {
      execute: "tsx src/db/helpers/setup-db.ts",
      envFile: ".env.development",
    },
    "db:studio:dev": {
      execute: "drizzle-kit studio",
      envFile: ".env.development",
    },
    "db:push:prod": {
      execute: "drizzle-kit push",
      envFile: ".env.production",
    },
    "db:setup:prod": {
      execute: "tsx src/db/helpers/setup-db.ts",
      envFile: ".env.production",
    },
    "db:studio:prod": {
      execute: "drizzle-kit studio",
      envFile: ".env.production",
    },
  },
});
