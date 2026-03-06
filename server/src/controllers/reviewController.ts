import { Request, Response } from 'express';
import Review from '../models/Review';

// Customer: get approved reviews only
export async function getApprovedReviews(_req: Request, res: Response) {
  try {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}

// Admin: get all reviews
export async function getAllReviews(req: Request, res: Response) {
  try {
    const { status } = req.query;
    const filter: Record<string, unknown> = {};
    if (status && status !== 'all') filter.status = status;

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}

// Customer: submit review
export async function createReview(req: Request, res: Response) {
  try {
    const { name, location, rating, message } = req.body;

    if (!name || !location || !rating || !message) {
      res.status(400).json({ message: 'सभी फ़ील्ड आवश्यक हैं' });
      return;
    }

    const review = await Review.create({ name, location, rating, message });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'अमान्य डेटा' });
  }
}

// Admin: update status
export async function updateReviewStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      res.status(400).json({ message: 'अमान्य स्थिति' });
      return;
    }

    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) {
      res.status(404).json({ message: 'समीक्षा नहीं मिली' });
      return;
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}

// Admin: delete review
export async function deleteReview(req: Request, res: Response) {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({ message: 'समीक्षा नहीं मिली' });
      return;
    }
    res.json({ message: 'समीक्षा हटाई गई' });
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}
