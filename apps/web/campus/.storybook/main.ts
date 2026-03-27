// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";
import type { InlineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],

  framework: "@storybook/react-vite",

  core: {
    enableCrashReports: false,
    disableWhatsNewNotifications: true,
  },

  async viteFinal(config: InlineConfig) {
    /**
     * Keep only Storybook's own plugins, then add back the safe ones we need
     */
    // @ts-ignore
    const storybookPlugins = (config.plugins ?? [])
      .flat(Infinity)
      .filter((plugin: any) => {
        if (!plugin?.name) return false;
        return (
          plugin.name.startsWith("storybook:") ||
          plugin.name === "plugin-csf" ||
          plugin.name === "storybook:react-docgen-plugin" ||
          plugin.name === "storybook:package-deduplication"
        );
      });

    config.plugins = [
      ...storybookPlugins,
      viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
      tailwindcss(),
      viteReact({ babel: { plugins: ["babel-plugin-react-compiler"] } }),
    ];

    return config;
  },
};

export default config;
