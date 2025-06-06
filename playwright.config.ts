import {chromium, defineConfig, devices} from '@playwright/test';

export default defineConfig({
    use: {
        ignoreHTTPSErrors: true,
    },
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = ({
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    reporter: 'html',
    use: {
        browserName: 'chromium',
        headless : false
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    },
});

module.exports = config