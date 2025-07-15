import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { UserRequest } from '../models/UserDTO';
import { ApiResponse } from '../utils/apiResponse';
import { validate } from 'uuid'; // For UUID validation
import logger from '../utils/logger';
import { CustomError } from '../utils/customErrors';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userRequest: UserRequest = req.body;
            const result = await this.userService.createUser(userRequest);
            return ApiResponse.created(res, result, 'User created successfully');
        } catch (error) {
            logger.warn('controller::createUser - Service returned error', { error });
            next(error); // Pass error to error handling middleware
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await this.userService.getAllUsers();
            return ApiResponse.success(res, results, 'Users retrieved successfully');
        } catch (error) {
            logger.warn('controller::getAllUsers - Service returned error', { error });
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                logger.warn('controller::getUserById - User ID is required');
                throw new CustomError(400, 'User ID is required');
            }
            if (!validate(id)) { // Basic UUID validation
                logger.warn('controller::getUserById - Invalid User ID format');
                throw new CustomError(400, 'Invalid User ID format');
            }
            const result = await this.userService.getUserById(id);
            return ApiResponse.success(res, result, 'User retrieved successfully');
        } catch (error) {
            logger.warn('controller::getUserById - Service returned error', { error });
            next(error);
        }
    }
}