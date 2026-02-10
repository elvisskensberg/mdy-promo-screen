import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for e2e tests
 * Optimized for 55-inch TV display testing
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3009',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'TV-4K',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 3840, height: 2160 }, // 55" 4K UHD TV
        deviceScaleFactor: 1,
      },
    },
    {
      name: 'TV-1080p',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }, // 55" Full HD TV
        deviceScaleFactor: 1,
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3009',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
