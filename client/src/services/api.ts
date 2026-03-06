const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(data.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// ═══════ Auth ═══════
export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; admin: { id: string; email: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () =>
    request<{ _id: string; email: string }>('/auth/me'),
};

// ═══════ Products ═══════
export interface ApiProduct {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: { _id: string; name: string } | string;
  fabric: string;
  color: string;
  occasion: string;
  isNewArrival: boolean;
  isFeatured: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  products: ApiProduct[];
  total: number;
}

export const productsApi = {
  getAll: (params?: { category?: string; search?: string; featured?: string }) => {
    const query = params ? '?' + new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString() : '';
    return request<ApiProduct[]>(`/products${query}`);
  },

  getPaginated: (params: { page: number; limit: number; category?: string; search?: string; featured?: string }) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ ...params, page: String(params.page), limit: String(params.limit) }).filter(([, v]) => v)
      )
    ).toString();
    return request<PaginatedProducts>(`/products?${query}`);
  },

  getOne: (id: string) =>
    request<ApiProduct>(`/products/${id}`),

  create: (data: Record<string, unknown>) =>
    request<ApiProduct>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Record<string, unknown>) =>
    request<ApiProduct>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/products/${id}`, { method: 'DELETE' }),
};

// ═══════ Categories ═══════
export interface ApiCategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  count: number;
  createdAt: string;
  updatedAt: string;
}

export const categoriesApi = {
  getAll: () => request<ApiCategory[]>('/categories'),

  create: (data: { name: string; description: string; image?: string }) =>
    request<ApiCategory>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: { name?: string; description?: string; image?: string }) =>
    request<ApiCategory>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/categories/${id}`, { method: 'DELETE' }),
};

// ═══════ Reviews ═══════
export interface ApiReview {
  _id: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export const reviewsApi = {
  getApproved: () => request<ApiReview[]>('/reviews/approved'),

  getAll: (status?: string) => {
    const query = status && status !== 'all' ? `?status=${status}` : '';
    return request<ApiReview[]>(`/reviews${query}`);
  },

  create: (data: { name: string; location: string; rating: number; message: string }) =>
    request<ApiReview>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: string) =>
    request<ApiReview>(`/reviews/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/reviews/${id}`, { method: 'DELETE' }),
};

// ═══════ Upload ═══════
export const uploadApi = {
  image: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return request<{ url: string; public_id: string }>('/upload', {
      method: 'POST',
      body: formData,
    });
  },
};
