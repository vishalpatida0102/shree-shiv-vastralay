import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Grid3X3, TrendingUp, Eye, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { productsApi, categoriesApi } from '../../services/api';
import type { ApiProduct, ApiCategory } from '../../services/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productsApi.getAll(), categoriesApi.getAll()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'कुल उत्पाद', value: products.length, icon: ShoppingBag, iconBg: '#eff6ff', iconColor: '#3b82f6' },
    { label: 'कुल श्रेणियाँ', value: categories.length, icon: Grid3X3, iconBg: '#f0fdf4', iconColor: '#10b981' },
    { label: 'विशेष', value: products.filter((s) => s.isFeatured).length, icon: TrendingUp, iconBg: '#fff7ed', iconColor: '#f97316' },
    { label: 'नई आवक', value: products.filter((s) => s.isNewArrival).length, icon: Eye, iconBg: '#faf5ff', iconColor: '#a855f7' },
  ];

  if (loading) {
    return (
      <AdminLayout title="नमस्ते, एडमिन">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
          <Loader2 size={28} style={{ color: '#d35400', animation: 'spin 1s linear infinite' }} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="नमस्ते, एडमिन">
      {/* Heading */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#222', margin: 0 }}>स्टोर अवलोकन</h2>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '6px' }}>
          अपने उत्पादों, श्रेणियों और स्टोर प्रदर्शन का विस्तृत अवलोकन प्राप्त करें।
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: stat.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color: stat.iconColor }} />
                </div>
              </div>
              <p style={{ fontSize: '30px', fontWeight: '700', color: '#222', margin: 0 }}>{stat.value}</p>
              <p style={{ fontSize: '14px', color: '#999', marginTop: '4px' }}>{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {/* Recent Products */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#222', margin: 0 }}>हाल के उत्पाद</h3>
            <Link to="/admin/products" style={{ fontSize: '12px', color: '#d35400', fontWeight: '500', textDecoration: 'none' }}>सभी देखें</Link>
          </div>
          <div>
            {products.slice(0, 5).map((product, i) => (
              <div key={product._id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 24px', borderTop: i !== 0 ? '1px solid #f5f5f5' : 'none' }}>
                <img src={product.images[0]} alt={product.name} style={{ width: '40px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#333', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</h4>
                  <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>{product.fabric}</p>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#222', whiteSpace: 'nowrap' }}>₹{product.price.toLocaleString('hi-IN')}</span>
              </div>
            ))}
            {products.length === 0 && (
              <p style={{ textAlign: 'center', padding: '24px', color: '#bbb', fontSize: '13px' }}>अभी कोई उत्पाद नहीं</p>
            )}
          </div>
        </div>

        {/* Top Categories */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#222', margin: 0 }}>शीर्ष श्रेणियाँ</h3>
            <Link to="/admin/categories" style={{ fontSize: '12px', color: '#d35400', fontWeight: '500', textDecoration: 'none' }}>सभी देखें</Link>
          </div>
          <div>
            {categories.map((cat, i) => (
              <div key={cat._id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 24px', borderTop: i !== 0 ? '1px solid #f5f5f5' : 'none' }}>
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid3X3 size={18} style={{ color: '#ccc' }} />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#333', margin: 0 }}>{cat.name}</h4>
                  <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>{cat.count} उत्पाद</p>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#888' }}>#{i + 1}</span>
              </div>
            ))}
            {categories.length === 0 && (
              <p style={{ textAlign: 'center', padding: '24px', color: '#bbb', fontSize: '13px' }}>अभी कोई श्रेणी नहीं</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
