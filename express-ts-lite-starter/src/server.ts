import app from './app';
import config from './config';
import logger from './utils/logger';
import { initializeDatabase } from './database/data-source';

const PORT = config.app.port;

const startServer = async () => {
    await initializeDatabase(); // Initialize TypeORM Data Source

    const server = app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        logger.info('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            logger.info('HTTP server closed');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        logger.info('SIGINT signal received: closing HTTP server');
        server.close(() => {
            logger.info('HTTP server closed');
            process.exit(0);
        });
    });
};

startServer();