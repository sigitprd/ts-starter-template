import { UserRequest, UserResponse } from '../models/UserDTO';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { hashPassword } from '../utils/bcrypt'; // <--- Make sure this path is correct now
import { CustomError } from '../utils/customErrors';
import logger from '../utils/logger';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<UserResponse[]> {
        const users = await this.userRepository.getAllUsers();
        return users.map(user => ({
            id: user.id,
            email: user.email,
            role: user.role,
        }));
    }

    async getUserById(id: string): Promise<UserResponse> {
        const user = await this.userRepository.getUserById(id);
        // Add a check here for null
        if (!user) {
            logger.warn(`service::getUserById - User not found for ID: ${id}`);
            throw new CustomError(404, 'User tidak ditemukan!'); // Throw a 404 error if user is null
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }

    async createUser(req: UserRequest): Promise<UserResponse> {
        const existing = await this.userRepository.existsByEmail(req.email);
        if (existing) {
            // Melemparkan CustomError dengan field 'errors'
            throw new CustomError(
                409,
                'Permintaan Anda gagal diproses',
                undefined, // originalError (tidak ada error asli dari DB di sini, ini validasi bisnis)
                undefined, // data
                { email: ['Email sudah terdaftar'] } // <--- Objek errors di sini
            );
        }

        const hashedPassword = await hashPassword(req.password);
        const newUser = new User();
        newUser.email = req.email;
        newUser.password = hashedPassword;
        newUser.role = 'user'; // Default role

        const createdUser = await this.userRepository.createUser(newUser);
        return {
            id: createdUser.id,
            email: createdUser.email,
            role: createdUser.role,
        };
    }
}