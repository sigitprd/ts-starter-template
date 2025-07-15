import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customErrors';
import { ApiResponse } from '../utils/apiResponse';
import logger from '../utils/logger';

export const errorHandler = (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error('middleware::errorHandler - An error occurred', {
        message: err.message,
        stack: err.stack,
        originalErrorCode: err instanceof CustomError && err.originalError ? (err.originalError as any).code : undefined,
        originalErrorDetails: err instanceof CustomError ? err.originalError : undefined,
        // Log juga field errors jika ada
        fieldErrors: err instanceof CustomError ? err.errors : undefined, // <--- Tambahkan ini
    });

    if (err instanceof CustomError) {
        // Ketika memanggil ApiResponse.error, sertakan err.errors
        return ApiResponse.error(res, err.statusCode, err.message, err.data, err.errors); // <--- Perubahan di sini!
    } else {
        // Untuk error yang tidak terduga atau error sistem
        return ApiResponse.internalServerError(res, 'Terjadi kesalahan internal server.');
    }
};