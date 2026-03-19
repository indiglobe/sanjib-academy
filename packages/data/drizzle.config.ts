import { env } from "@repo/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
