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
    "db:dev": {
      execute:
        "pnpm db:dev:setup && pnpm db:dev:push && pnpm db:dev:seed && pnpm db:dev:studio",
    },
    "db:prod": {
      execute:
        "pnpm db:prod:setup && pnpm db:prod:push && pnpm db:prod:seed && pnpm db:prod:studio",
    },
    "db:dev:setup": {
      execute: "tsx src/db/helpers/setup-db.ts",
      envFile: ".env.development",
    },
    "db:dev:push": {
      execute: "drizzle-kit push",
      envFile: ".env.development",
    },
    "db:dev:seed": {
      execute: "tsx src/db/helpers/seed.ts",
      envFile: ".env.development",
    },
    "db:dev:studio": {
      execute: "drizzle-kit studio",
      envFile: ".env.development",
    },
    "db:prod:setup": {
      execute: "tsx src/db/helpers/setup-db.ts",
      envFile: ".env.production",
    },
    "db:prod:push": {
      execute: "drizzle-kit push",
      envFile: ".env.production",
    },
    "db:prod:seed": {
      execute: "tsx src/db/helpers/seed.ts",
      envFile: ".env.production",
    },
    "db:prod:studio": {
      execute: "drizzle-kit studio",
      envFile: ".env.production",
    },
  },
});
