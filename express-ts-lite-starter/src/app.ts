import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { ApiResponse } from './utils/apiResponse';
import { errorHandler } from './middlewares/errorHandler';
import logger from './utils/logger';
import routes from './routes'; // <--- Import router utama dari 'routes/index.ts'

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure Express apps by setting various HTTP headers
app.use(compression()); // Compress response bodies for all request

// Rate Limiting
const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 50, // 50 requests per 30 seconds
    handler: (req, res) => {
        ApiResponse.tooManyRequests(res, 'Too many requests, please try again later.');
    },
    keyGenerator: (req) => req.ip || 'unknown',
});
app.use(limiter);

// API Routes
app.use('/api', routes); // <--- Gunakan router utama di sini, dengan prefix '/api'

// Root endpoint for health check or basic info
app.get('/', (req, res) => {
    ApiResponse.success(res, { app: 'Express TS Lite Starter' }, 'Welcome to the API!');
});

// Fallback route for handling unknown routes
app.all('*', (req, res) => {
    logger.info(`Route not found: ${req.method} ${req.originalUrl}`);
    return ApiResponse.notFound(res, 'Route not found');
});

// Error Handling Middleware (must be last)
app.use(errorHandler);

export default app;