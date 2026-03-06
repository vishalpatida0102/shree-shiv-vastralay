export interface Saree {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  categoryName?: string;
  fabric: string;
  color: string;
  occasion: string;
  isNew: boolean;
  isFeatured: boolean;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  count: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}
