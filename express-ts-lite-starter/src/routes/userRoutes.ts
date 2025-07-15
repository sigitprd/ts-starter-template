import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { validateRequest } from '../middlewares/validation';
import { UserRequest } from '../models/UserDTO';
import { apiKeyAuth } from '../middlewares/auth';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Apply API Key authentication to all user routes
router.use(apiKeyAuth);

// These paths are RELATIVE to where this router is 'use'd
// So, if userRoutes is used at '/users', then this GET '/' becomes '/users/'
// and GET '/:id' becomes '/users/:id'
router.post('/', validateRequest(UserRequest), (req, res, next) => userController.createUser(req, res, next));
router.get('/', (req, res, next) => userController.getAllUsers(req, res, next));
router.get('/:id', (req, res, next) => userController.getUserById(req, res, next));

export default router;