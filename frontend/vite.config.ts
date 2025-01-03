import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [!isVitest() && !isStorybook() && reactRouter(), tsconfigPaths()],
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
