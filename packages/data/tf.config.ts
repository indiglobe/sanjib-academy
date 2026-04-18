import { defineConfig } from "taskforge-cli/config";

export default defineConfig({
  envDir: "../../",
  scripts: {
    test: {
      execute: "vitest",
    },
    "db:generate": { execute: "drizzle-kit generate" },
    "db:migrate": { execute: "drizzle-kit migrate" },
    "db:pull": { execute: "drizzle-kit pull" },
    "db:test": {
      execute: "pnpm db:test:setup && pnpm db:test:push",
      envValues: {
        STRICT: false,
        VERBOSE: false,
      },
    },
    "db:dev": {
      execute:
        "pnpm db:dev:setup && pnpm db:dev:push && pnpm db:dev:seed && pnpm db:dev:studio",
      envValues: {
        STRICT: false,
        VERBOSE: false,
      },
    },
    "db:prod": {
      execute:
        "pnpm db:prod:setup && pnpm db:prod:push && pnpm db:prod:seed && pnpm db:prod:studio",
    },
    "db:dev:setup": {
      execute: "tsx src/helpers/setup-db.ts",
      envFile: ".env.development",
    },
    "db:dev:push": {
      execute: "drizzle-kit push",
      envFile: ".env.development",
    },
    "db:dev:seed": {
      execute: "tsx src/helpers/seed.ts",
      envFile: ".env.development",
    },
    "db:dev:studio": {
      execute: "drizzle-kit studio",
      envFile: ".env.development",
    },
    "db:test:setup": {
      execute: "tsx src/helpers/setup-db.ts",
      envFile: ".env.test",
    },
    "db:test:push": {
      execute: "drizzle-kit push",
      envFile: ".env.test",
    },
    "db:test:seed": {
      execute: "tsx src/helpers/seed.ts",
      envFile: ".env.test",
    },
    "db:test:studio": {
      execute: "drizzle-kit studio",
      envFile: ".env.test",
    },
    "db:prod:setup": {
      execute: "tsx src/helpers/setup-db.ts",
      envFile: ".env.production",
    },
    "db:prod:push": {
      execute: "drizzle-kit push",
      envFile: ".env.production",
    },
    "db:prod:seed": {
      execute: "tsx src/helpers/seed.ts",
      envFile: ".env.production",
    },
    "db:prod:studio": {
      execute: "drizzle-kit studio",
      envFile: ".env.production",
    },
  },
});
