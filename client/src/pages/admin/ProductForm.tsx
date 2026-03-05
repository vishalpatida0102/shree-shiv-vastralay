import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft, Package, IndianRupee, Tag, Image, Sparkles } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { sarees, categories } from '../../data/dummyData';

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existing = isEdit ? sarees.find((s) => s.id === id) : null;

  const [form, setForm] = useState({
    name: existing?.name || '',
    price: existing?.price?.toString() || '',
    originalPrice: existing?.originalPrice?.toString() || '',
    description: existing?.description || '',
    category: existing?.category || '',
    fabric: existing?.fabric || '',
    color: existing?.color || '',
    occasion: existing?.occasion || '',
    isNew: existing?.isNew || false,
    isFeatured: existing?.isFeatured || false,
  });

  const [images, setImages] = useState<string[]>(existing?.images || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/products');
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #eee',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#333',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#444',
    marginBottom: '8px',
  };

  return (
    <AdminLayout title="Hi, Admin 👋">
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <button
          onClick={() => navigate('/admin/products')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#999', background: 'none', border: 'none', cursor: 'pointer', padding: '0', marginBottom: '16px' }}
        >
          <ArrowLeft size={15} />
          Back to Products
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#222', margin: '0' }}>
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h2>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '4px' }}>
          {isEdit ? 'Update product details and images' : 'Fill in the details to add a new product'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Section 1: Basic Info */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fff7f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={16} style={{ color: '#d35400' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>Basic Information</h3>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>Product name and description</p>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <div>
                <label style={labelStyle}>Product Name (Hindi)</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  placeholder="बनारसी सिल्क साड़ी"
                  onFocus={(e) => e.target.style.borderColor = '#d35400'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <label style={labelStyle}>Description (Hindi)</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder="शुद्ध बनारसी सिल्क साड़ी, सोने की ज़री का बारीक काम..."
                  onFocus={(e) => e.target.style.borderColor = '#d35400'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IndianRupee size={16} style={{ color: '#16a34a' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>Pricing</h3>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>Set product price and discount</p>
              </div>
            </div>
            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Selling Price (₹)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#bbb', fontSize: '14px', fontWeight: '600' }}>₹</span>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    style={{ ...inputStyle, paddingLeft: '32px' }}
                    placeholder="12,500"
                    onFocus={(e) => e.target.style.borderColor = '#d35400'}
                    onBlur={(e) => e.target.style.borderColor = '#eee'}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>
                  Original Price (₹) <span style={{ color: '#ccc', fontWeight: '400' }}>— optional</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#bbb', fontSize: '14px', fontWeight: '600' }}>₹</span>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    style={{ ...inputStyle, paddingLeft: '32px' }}
                    placeholder="15,000"
                    onFocus={(e) => e.target.style.borderColor = '#d35400'}
                    onBlur={(e) => e.target.style.borderColor = '#eee'}
                  />
                </div>
              </div>
              {form.price && form.originalPrice && Number(form.originalPrice) > Number(form.price) && (
                <div style={{ gridColumn: '1 / -1', backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={14} style={{ color: '#16a34a' }} />
                  <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>
                    {Math.round(((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) * 100)}% discount will be shown to customers
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Details */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tag size={16} style={{ color: '#3b82f6' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>Product Details</h3>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>Category, fabric, color and occasion</p>
              </div>
            </div>
            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Category</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                  onFocus={(e) => e.target.style.borderColor = '#d35400'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Fabric (Hindi)</label>
                <input
                  type="text"
                  required
                  value={form.fabric}
                  onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                  style={inputStyle}
                  placeholder="शुद्ध सिल्क"
                  onFocus={(e) => e.target.style.borderColor = '#d35400'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                />
              </div>
              <div>
                <label style={labelStyle}>Color (Hindi)</label>
                <input
                  type="text"
                  required
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  style={inputStyle}
                  placeholder="लाल"
                  onFocus={(e) => e.target.style.borderColor = '#d35400'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                />
              </div>
              <div>
                <label style={labelStyle}>Occasion (Hindi)</label>
                <input
                  type="text"
                  required
                  value={form.occasion}
                  onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  style={inputStyle}
                  placeholder="शादी"
                  onFocus={(e) => e.target.style.borderColor = '#d35400'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Tags */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fdf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} style={{ color: '#a855f7' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>Product Tags</h3>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>Highlight this product on the store</p>
              </div>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
              <label
                style={{
                  flex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: form.isNew ? '2px solid #d35400' : '1px solid #eee',
                  backgroundColor: form.isNew ? '#fff7f0' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="checkbox"
                  checked={form.isNew}
                  onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#d35400', cursor: 'pointer' }}
                />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: '0' }}>New Arrival</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>Show "New" badge on product</p>
                </div>
              </label>
              <label
                style={{
                  flex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: form.isFeatured ? '2px solid #d35400' : '1px solid #eee',
                  backgroundColor: form.isFeatured ? '#fff7f0' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#d35400', cursor: 'pointer' }}
                />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: '0' }}>Featured</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>Show on homepage featured section</p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 5: Images */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fefce8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image size={16} style={{ color: '#ca8a04' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>Product Images</h3>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>Upload high-quality product photos</p>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '14px' }}>
                {images.map((img, i) => (
                  <div
                    key={i}
                    style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: 'rgba(239,68,68,0.9)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={12} />
                    </button>
                    {i === 0 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        backgroundColor: 'rgba(211,84,0,0.85)',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '4px 0',
                        letterSpacing: '0.5px',
                      }}>
                        COVER
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  style={{
                    aspectRatio: '3/4',
                    border: '2px dashed #ddd',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#bbb',
                    backgroundColor: '#fafafa',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#d35400';
                    e.currentTarget.style.color = '#d35400';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.color = '#bbb';
                  }}
                >
                  <Upload size={22} />
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>Upload</span>
                </button>
              </div>
              <p style={{ fontSize: '12px', color: '#bbb', marginTop: '14px' }}>
                First image will be used as the cover photo. Recommended: 800x1000px, max 5MB each.
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '12px', paddingBottom: '20px' }}>
            <button
              type="submit"
              className="hover:bg-[#c0392b] transition-colors"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#d35400',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isEdit ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="hover:bg-[#fafafa] transition-colors"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 32px',
                border: '1px solid #eee',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#666',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>

        </div>
      </form>
    </AdminLayout>
  );
}
