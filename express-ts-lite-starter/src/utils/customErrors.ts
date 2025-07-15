export class CustomError extends Error {
    statusCode: number;
    data?: any;
    originalError?: Error;
    // Tambahkan properti 'errors' yang akan menampung pesan kesalahan per field
    errors?: { [field: string]: string[] }; // <--- Tambahkan baris ini

    constructor(
        statusCode: number,
        message: string,
        originalError?: Error,
        data?: any,
        errors?: { [field: string]: string[] } // <--- Tambahkan ini di constructor
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.data = data;
        this.originalError = originalError;
        this.errors = errors; // <--- Simpan objek errors
        Error.captureStackTrace(this, this.constructor);
    }
}