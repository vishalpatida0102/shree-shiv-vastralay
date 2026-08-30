import { Router } from 'express';
import { getConfig, updateConfig, resetConfig } from '../controllers/configController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getConfig);
router.put('/', authMiddleware, updateConfig);
router.post('/reset', authMiddleware, resetConfig);

export default router;
