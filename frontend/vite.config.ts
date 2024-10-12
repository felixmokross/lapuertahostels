import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    !isVitest() &&
      !isStorybook() &&
      remix({
        ignoredRouteFiles: ["**/.*"],
      }),
    tsconfigPaths(),
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});

function isStorybook() {
  return process.argv[1]?.includes("storybook");
}

function isVitest() {
  return !!process.env.VITEST;
}
