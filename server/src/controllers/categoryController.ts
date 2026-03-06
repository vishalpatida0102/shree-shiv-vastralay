import { Request, Response } from 'express';
import Category from '../models/Category';
import Product from '../models/Product';

export async function getCategories(_req: Request, res: Response) {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    // Add product count to each category
    const withCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat._id });
        return { ...cat.toObject(), count };
      })
    );

    res.json(withCount);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'अमान्य डेटा' });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      res.status(404).json({ message: 'श्रेणी नहीं मिली' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: 'अमान्य डेटा' });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) {
      res.status(400).json({ message: `हटा नहीं सकते: ${productCount} उत्पाद इस श्रेणी में हैं` });
      return;
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'श्रेणी नहीं मिली' });
      return;
    }
    res.json({ message: 'श्रेणी हटाई गई' });
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}
