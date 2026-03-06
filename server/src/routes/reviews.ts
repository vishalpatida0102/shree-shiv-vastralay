import { Router } from 'express';
import { getApprovedReviews, getAllReviews, createReview, updateReviewStatus, deleteReview } from '../controllers/reviewController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public
router.get('/approved', getApprovedReviews);
router.post('/', createReview);

// Admin
router.get('/', authMiddleware, getAllReviews);
router.patch('/:id/status', authMiddleware, updateReviewStatus);
router.delete('/:id', authMiddleware, deleteReview);

export default router;
