import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
    app: {
        name: string;
        environment: string;
        baseUrl: string;
        port: string;
        logLevel: string;
        logFile: string;
    };
    apiKeys: {
        xApiKey: string;
    };
    db: {
        postgres: {
            host: string;
            port: number;
            username: string;
            password: string;
            database: string;
            sslMode: string;
        };
    };
}

const config: Config = {
    app: {
        name: process.env.APP_NAME || 'ExpressLiteStarter',
        environment: process.env.APP_ENV || 'development',
        baseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
        port: process.env.APP_PORT || '8080',
        logLevel: process.env.APP_LOG_LEVEL || 'info',
        logFile: process.env.APP_LOG_FILE || './logs/app.log',
    },
    apiKeys: {
        xApiKey: process.env.X_API_KEY || 'your_secret_api_key',
    },
    db: {
        postgres: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || 'postgres',
            database: process.env.DB_NAME || 'postgres',
            sslMode: process.env.DB_SSL_MODE || 'disable',
        },
    },
};

export default config;