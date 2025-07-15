import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { ApiResponse } from '../utils/apiResponse';
import logger from '../utils/logger';

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== config.apiKeys.xApiKey) {
        logger.warn('middleware::apiKeyAuth - Invalid x-api-key provided');
        return ApiResponse.unauthorized(res, 'Kredensial tidak valid!');
    }
    next();
};