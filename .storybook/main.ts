import type { StorybookConfig } from "@storybook/react-vite";
import turbosnap from "vite-plugin-turbosnap";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../docs/**/*.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-react-i18next",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config, { configType }) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        alias: {
          "~": "/app",
        },
      },
      assetsInclude: ["/sb-preview/runtime.js"], // Bug workaround, see https://github.com/storybookjs/storybook/issues/25256
      plugins:
        configType === "PRODUCTION"
          ? [
              turbosnap({
                // This should be the base path of your storybook.  In monorepos, you may only need process.cwd().
                rootDir: config.root ?? process.cwd(),
              }),
            ]
          : [],
    });
  },
};
export default config;
