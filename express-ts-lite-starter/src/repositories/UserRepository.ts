import {IsNull, Repository} from 'typeorm';
import {User} from '../models/User';
import {AppDataSource} from '../database/data-source';
import {CustomError} from '../utils/customErrors';
import logger from '../utils/logger';

export class UserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find({ where: { deletedAt: IsNull() } });
        } catch (error: any) { // <--- Pastikan tipe error adalah 'any' atau 'unknown' untuk mengakses propertinya
            // LOG THE ORIGINAL ERROR OBJECT HERE!
            logger.error('repo::getAllUsers - Failed to get users', { error: error.message, stack: error.stack, originalError: error }); // <--- Perubahan di sini!
            throw new CustomError(500, 'Failed to get users', error); // <--- Tambahkan error asli sebagai argumen ketiga
        }
    }

    // ... (metode lainnya seperti getUserById, findByEmail, existsByEmail, createUser juga bisa diubah serupa)
    async getUserById(id: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { id, deletedAt: IsNull() } });
            if (!user) {
                logger.warn(`repo::getUserById - User not found for ID: ${id}`);
                // Jika tidak ditemukan, jangan lempar CustomError dengan error asli
                // karena ini bukan error dari database, melainkan business logic not found.
                // throw new CustomError(404, 'User tidak ditemukan!');
                return null;
            }
            return user;
        } catch (error: any) { // Tangkap error apapun yang mungkin terjadi di sini
            logger.error(`repo::getUserById - Failed to get user by ID: ${id}`, { error: error.message, stack: error.stack, originalError: error });
            // Throw error asli untuk memastikan stack trace tetap ada atau lempar CustomError dengan error asli
            throw new CustomError(500, 'Failed to get user', error); // Contoh: Jika error adalah masalah DB
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findOne({where: {email, deletedAt: IsNull()}});
        } catch (error: any) {
            logger.error(`repo::findByEmail - Failed to find user by email: ${email}`, { error: error.message, stack: error.stack, originalError: error });
            throw new CustomError(500, 'Failed to find user', error);
        }
    }

    async existsByEmail(email: string): Promise<boolean> {
        try {
            return await this.userRepository.exists({where: {email, deletedAt: IsNull()}});
        } catch (error: any) {
            logger.error(`repo::existsByEmail - Failed to check user existence for email: ${email}`, { error: error.message, stack: error.stack, originalError: error });
            throw new CustomError(500, 'Failed to check user existence', error);
        }
    }

    async createUser(user: User): Promise<User> {
        try {
            const newUser = this.userRepository.create(user);
            await this.userRepository.save(newUser);
            return newUser;
        } catch (error: any) {
            logger.error(`repo::createUser - Failed to create user for email: ${user.email}`, { error: error.message, stack: error.stack, originalError: error });
            if (error.code === '23505') { // PostgreSQL unique violation error code
                throw new CustomError(409, 'Email sudah terdaftar.', error);
            }
            throw new CustomError(500, 'Failed to create user', error);
        }
    }
}