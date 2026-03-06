import { Router } from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', authMiddleware, upload.single('image'), uploadImage);

export default router;
