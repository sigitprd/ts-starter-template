import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../config';

// Import format errors()
const { combine, timestamp, printf, colorize, align, errors } = winston.format; // <--- Tambahkan 'errors' di sini

const logFormat = printf(({ level, message, timestamp, stack }) => {
    // Jika ada stack trace (dari error), gunakan itu; jika tidak, gunakan message
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
    level: config.app.logLevel,
    format: combine(
        // Penting: tambahkan errors() di sini agar stack trace ditangkap
        errors({ stack: true }), // <--- Tambahkan baris ini
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),
                align(),
                logFormat
            ),
        }),
        new DailyRotateFile({
            filename: `${config.app.logFile.replace('.log', '')}-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
    exceptionHandlers: [
        new DailyRotateFile({
            filename: `${config.app.logFile.replace('.log', '')}-exceptions-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
    rejectionHandlers: [
        new DailyRotateFile({
            filename: `${config.app.logFile.replace('.log', '')}-rejections-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

export default logger;