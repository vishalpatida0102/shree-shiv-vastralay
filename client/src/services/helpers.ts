import type { Saree, Category } from '../types';
import type { ApiProduct, ApiCategory } from './api';

export function toSaree(p: ApiProduct): Saree {
  const catName = typeof p.category === 'object' ? p.category.name : '';
  const catId = typeof p.category === 'object' ? p.category._id : (p.category || '');
  return {
    id: p._id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    images: p.images,
    category: catId,
    categoryName: catName,
    fabric: p.fabric,
    color: p.color,
    occasion: p.occasion,
    isNew: p.isNewArrival,
    isFeatured: p.isFeatured,
    inStock: p.inStock,
  };
}

export function toCategory(c: ApiCategory): Category {
  return {
    id: c._id,
    name: c.name,
    image: c.image || '',
    description: c.description || '',
    count: c.count || 0,
  };
}
