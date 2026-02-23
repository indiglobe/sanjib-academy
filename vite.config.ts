/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const config = defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [
      devtools(),

      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),

      tailwindcss(),

      tanstackStart(),

      nitro({ output: { dir: "dist" } }),

      viteReact({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
    ],

    test: {
      globals: true,
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      exclude: ["src/tests/e2e/**/*.ts", "src/tests/e2e/**/*.test.tsx"],
      environment: "jsdom",
      setupFiles: "./src/lib/vitest/setup.ts",
    },

    server: {
      host: "0.0.0.0",
      allowedHosts: isDev ? true : [],
    },
  };
});

export default config;
