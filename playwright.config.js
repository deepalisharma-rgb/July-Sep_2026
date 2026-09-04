// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const timestamp = new Date()
  .toISOString()
  .replace(/:/g, '-')
  .replace(/\..+/, '');

const config=({
  testDir: './tests',
  timeout: 80*1000,
  expect: {
    timeout:80*1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false, // Set to false to run tests sequentially
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, // Set to 2 to retry failed tests on CI and 0 to not retry on local
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
    ['html', {open: 'always', outputFolder: `playwright-report/report-${timestamp}` }], ['github'], ['list'], ['junit', { outputFile: `playwright-report/report-${timestamp}/results.xml` }], ['json', { outputFile: `playwright-report/report-${timestamp}/results.json` }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    // browserName : 'chromium',
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    headless: false, // Set to false to see the browser UI
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  
});
module.exports = config