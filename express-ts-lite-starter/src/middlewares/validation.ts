import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ApiResponse } from '../utils/apiResponse';
import logger from '../utils/logger';

// Add 'extends object' to the generic type T
export function validateRequest<T extends object>(type: new () => T) { // <--- Change here
    return async (req: Request, res: Response, next: NextFunction) => {
        const object = plainToInstance(type, req.body);
        const errors: ValidationError[] = await validate(object); // This line will now be happy

        if (errors.length > 0) {
            const errorMessages: { [key: string]: string[] } = {};
            errors.forEach(err => {
                if (err.constraints) {
                    errorMessages[err.property] = Object.values(err.constraints);
                }
            });
            logger.warn('middleware::validateRequest - Validation failed', { errors: errorMessages });
            return ApiResponse.badRequest(res, errorMessages, 'Permintaan Anda gagal diproses karena kesalahan validasi.');
        }
        next();
    };
}