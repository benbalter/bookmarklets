import { defineConfig, devices } from '@playwright/test'

// Every request is fulfilled from local fixtures (see test/browser/helpers.ts),
// so the tests never touch the network.
export default defineConfig({
  testDir: 'test/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testMatch: /smoke\.spec\.ts$/ },
  ],
})
