import { defineConfig } from "@playwright/test";

export default defineConfig({
  fullyParallel: false,
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:43127",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "corepack pnpm dev --host 127.0.0.1 --port 43127 --strictPort",
    reuseExistingServer: false,
    url: "http://127.0.0.1:43127",
  },
  workers: 1,
});
