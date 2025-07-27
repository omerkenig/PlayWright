import {defineConfig, devices} from '@playwright/test';
import {getBaseUrl} from './utils/envHelper';


import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',
    retries: 2,
    workers: 5,

    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    // reporter: 'html',
    reporter: [["line"], ["allure-playwright"]],
    use: {
        browserName: 'chromium',
        headless: false,
        viewport: null,
        baseURL: process.env.BASE_URL,
        launchOptions: {
            args: ['--start-maximized']
        },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'retain-on-failure',
        // ...devices['Galaxy S24 landscape'],
    },
});
