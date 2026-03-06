import { Request, Response } from 'express';
import Product from '../models/Product';

export async function getProducts(req: Request, res: Response) {
  try {
    const { category, search, featured, page, limit } = req.query;
    const filter: Record<string, unknown> = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { fabric: { $regex: search, $options: 'i' } },
      ];
    }

    // If page & limit provided, return paginated response
    if (page && limit) {
      const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
      const limitNum = Math.max(1, Math.min(50, parseInt(limit as string, 10) || 12));
      const skip = (pageNum - 1) * limitNum;

      const [products, total] = await Promise.all([
        Product.find(filter)
          .populate('category', 'name')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum),
        Product.countDocuments(filter),
      ]);

      res.json({ products, total });
      return;
    }

    // No pagination — return all (backward compatible)
    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
      res.status(404).json({ message: 'उत्पाद नहीं मिला' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'अमान्य डेटा' });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ message: 'उत्पाद नहीं मिला' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'अमान्य डेटा' });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'उत्पाद नहीं मिला' });
      return;
    }
    res.json({ message: 'उत्पाद हटाया गया' });
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}
