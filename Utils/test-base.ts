const {base} = require('@playwright/test');

export function getBaseUrl(): string {
    const env = process.env.ENV || 'dev';

    const envUrls: Record<string, string> = {
        dev: 'https://dev.example.com',
        int: 'https://int.example.com',
        prod: 'https://prod.example.com',
    };

    const url = envUrls[env.toLowerCase()];
    if (!url) {
        throw new Error(`Unknown environment: ${env}`);
    }

    return url;
}

exports.test = base.test.extend(
    {
        testDataForOrder: {
            username: "Aa010110@aaa.com",
            password: "Aa010110",
            productName: "ADIDAS ORIGINAL"
        }
    }
)