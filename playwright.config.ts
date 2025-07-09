import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 2,
    workers: 5,
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    reporter: 'html',
    use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'retain-on-failure',
        // ...devices['Galaxy S24 landscape'],
    },
});
