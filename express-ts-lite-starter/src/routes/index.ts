import { Router } from 'express';
import userRoutes from './userRoutes';
import logger from '../utils/logger'; // Import logger

const router = Router();

// Tambahkan log di sini
router.use((req, res, next) => {
    logger.info(`Root Router received request for: ${req.method} ${req.originalUrl}`);
    next();
});

router.use('/users', userRoutes);

export default router;