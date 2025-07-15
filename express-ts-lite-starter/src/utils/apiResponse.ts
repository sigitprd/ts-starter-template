import { Response } from 'express';

export class ApiResponse {
    static success(res: Response, data: any, message: string = 'Success', statusCode: number = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    // Add the 'created' method here
    static created(res: Response, data: any, message: string = 'Resource created successfully') {
        return ApiResponse.success(res, data, message, 201); // Use success method with 201 status code
    }

    static error(
        res: Response,
        statusCode: number = 500,
        message: string = 'An error occurred',
        data?: any,
        fieldErrors?: { [field: string]: string[] }
    ) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors: fieldErrors,
            data,
        });
    }

    static badRequest(res: Response, errors: { [field: string]: string[] }, message: string = 'Permintaan Anda gagal diproses karena kesalahan validasi.') {
        return ApiResponse.error(res, 400, message, undefined, errors);
    }

    static unauthorized(res: Response, message: string = 'Autentikasi diperlukan.') {
        return ApiResponse.error(res, 401, message);
    }

    static forbidden(res: Response, message: string = 'Anda tidak memiliki akses untuk tindakan ini.') {
        return ApiResponse.error(res, 403, message);
    }

    static notFound(res: Response, message: string = 'Resource tidak ditemukan.') {
        return ApiResponse.error(res, 404, message);
    }

    static conflict(res: Response, message: string = 'Konflik terjadi, resource sudah ada.') {
        return ApiResponse.error(res, 409, message);
    }

    static tooManyRequests(res: Response, message: string = 'Terlalu banyak permintaan, coba lagi nanti.') {
        return ApiResponse.error(res, 429, message);
    }

    static internalServerError(res: Response, message: string = 'Terjadi kesalahan internal server.', data?: any) {
        return ApiResponse.error(res, 500, message, data);
    }
}