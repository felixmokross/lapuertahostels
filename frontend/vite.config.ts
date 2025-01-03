import { reactRouter } from "@react-router/dev/vite";
import { installGlobals } from "react-router";
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
      reactRouter({
        ignoredRouteFiles: ["**/.*"],
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_singleFetch: true,
          v3_lazyRouteDiscovery: true,
          v3_routeConfig: true,
        },
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
