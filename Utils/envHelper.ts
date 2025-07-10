// utils/envHelper.ts
import dotenv from 'dotenv';
dotenv.config();

type Environment =  'int' | 'drl' | 'oper';

const ENV: Environment = (process.env.ENV?.toLowerCase() as Environment) || 'dev';

const ENV_URLS: Record<Environment, string> = {
    int: 'https://google.com',
    drl: 'https://ynet.co.il',
    oper: 'https://walla.co.il',
};

export function getEnv(): Environment {
    return ENV;
}

export function getBaseUrl(): string {
    const url = ENV_URLS[ENV];
    if (!url) throw new Error(`No base URL defined for environment: ${ENV}`);
    return url;
}
