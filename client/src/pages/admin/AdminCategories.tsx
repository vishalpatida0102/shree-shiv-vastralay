import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Eye, X, Grid3X3, Loader } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { categoriesApi, uploadApi } from '../../services/api';
import type { ApiCategory } from '../../services/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '', image: '' });
  const [viewCat, setViewCat] = useState<ApiCategory | null>(null);
  const [focusedField, setFocusedField] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch {
      setError('श्रेणियाँ लोड करने में विफल');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditId(null);
    setForm({ name: '', description: '', image: '' });
    setShowModal(true);
    setError('');
  };

  const openEdit = (id: string) => {
    const cat = categories.find((c) => c._id === id);
    if (cat) {
      setEditId(id);
      setForm({ name: cat.name, description: cat.description || '', image: cat.image || '' });
      setShowModal(true);
      setError('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadApi.image(file);
      setForm((f) => ({ ...f, image: url }));
    } catch {
      setError('तस्वीर अपलोड विफल');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editId) {
        await categoriesApi.update(editId, form);
      } else {
        await categoriesApi.create(form);
      }
      setShowModal(false);
      fetchCategories();
      showToast(editId ? 'श्रेणी सफलतापूर्वक अपडेट हुई!' : 'श्रेणी सफलतापूर्वक बनाई गई!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'सहेजने में विफल');
      showToast('श्रेणी सहेजने में विफल', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    setError('');
    try {
      await categoriesApi.delete(id);
      setCategories(categories.filter((c) => c._id !== id));
      if (viewCat?._id === id) setViewCat(null);
      showToast('श्रेणी सफलतापूर्वक हटाई गई!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'हटाने में विफल');
      showToast('श्रेणी हटाने में विफल', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 14px',
    border: focusedField === field ? '1.5px solid #d35400' : '1.5px solid #eee',
    borderRadius: '10px',
    fontSize: '13px',
    outline: 'none',
    backgroundColor: focusedField === field ? '#fff' : '#fafafa',
    transition: 'all 0.2s',
    color: '#333',
    boxSizing: 'border-box' as const,
  });

  if (loading) {
    return (
      <AdminLayout title="Categories">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', color: '#bbb' }}>
          <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Categories">
      {/* Heading */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#222', margin: '0 0 4px 0' }}>श्रेणी प्रबंधन</h2>
        <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>उत्पाद श्रेणियाँ प्रबंधित करें</p>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: '#dc2626', fontSize: '13px', padding: '10px 14px', borderRadius: '10px', marginBottom: '14px' }}>
          {error}
        </div>
      )}

      {/* Filter Bar */}
      <div style={{
        backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #f0f0f0',
        padding: '14px 16px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center',
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '160px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
          <input
            type="text"
            placeholder="श्रेणियाँ खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '38px', paddingRight: '14px', paddingTop: '10px', paddingBottom: '10px', border: '1px solid #eee', borderRadius: '10px', fontSize: '13px', outline: 'none', backgroundColor: '#fafafa', color: '#333', boxSizing: 'border-box' }}
          />
        </div>
        <button
          onClick={openNew}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            backgroundColor: '#d35400', color: '#fff', padding: '10px 18px', borderRadius: '10px',
            fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', border: 'none', cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          श्रेणी जोड़ें
        </button>
      </div>

      {/* Categories Grid */}
      <style>{`
        #cat-cards { display: grid; grid-template-columns: 1fr; gap: 10px; }
        @media (min-width: 640px) { #cat-cards { grid-template-columns: 1fr 1fr; } }
      `}</style>
      <div id="cat-cards">
        {filtered.map((cat) => (
          <div key={cat._id} style={{
            backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #f0f0f0',
            overflow: 'hidden', display: 'flex', gap: '14px', padding: '14px', alignItems: 'center',
          }}>
            {cat.image ? (
              <img src={cat.image} alt={cat.name} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
            ) : (
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Grid3X3 size={20} style={{ color: '#ccc' }} />
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#222', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</p>
                <span style={{ flexShrink: 0, fontSize: '10px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px', backgroundColor: 'rgba(5,150,105,0.08)', color: '#059669' }}>सक्रिय</span>
              </div>
              <p style={{ fontSize: '11px', color: '#999', margin: '0 0 6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {cat.description || 'कोई विवरण नहीं'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: '#bbb' }}>{cat.count || 0} उत्पाद</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <div onClick={() => setViewCat(cat)} style={{ width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#bbb' }}>
                    <Eye size={15} />
                  </div>
                  <div onClick={() => openEdit(cat._id)} style={{ width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#bbb' }}>
                    <Pencil size={15} />
                  </div>
                  <div
                    onClick={() => !deleting && handleDelete(cat._id)}
                    style={{ width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: deleting === cat._id ? '#dc2626' : '#bbb', opacity: deleting === cat._id ? 0.5 : 1 }}
                  >
                    <Trash2 size={15} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#bbb', fontSize: '13px' }}>
          <Grid3X3 size={32} style={{ color: '#ddd', margin: '0 auto 8px' }} />
          कोई श्रेणी नहीं मिली
        </div>
      )}

      {/* View Category Modal */}
      {viewCat && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={() => setViewCat(null)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', backgroundColor: '#fff', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: '480px', boxShadow: '0 -4px 30px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '12px 0 0', textAlign: 'center' }}>
              <div style={{ width: '36px', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px', margin: '0 auto' }} />
            </div>
            {viewCat.image ? (
              <div style={{ position: 'relative', margin: '14px 20px 0', borderRadius: '14px', overflow: 'hidden', height: '180px' }}>
                <img src={viewCat.image} alt={viewCat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                <div onClick={() => setViewCat(null)} style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={14} style={{ color: '#555' }} />
                </div>
                <h3 style={{ position: 'absolute', bottom: '14px', left: '16px', fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>{viewCat.name}</h3>
              </div>
            ) : (
              <div style={{ padding: '14px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#222', margin: 0 }}>{viewCat.name}</h3>
                <div onClick={() => setViewCat(null)} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={14} style={{ color: '#555' }} />
                </div>
              </div>
            )}
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(5,150,105,0.08)', color: '#059669' }}>सक्रिय</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#888' }}>{viewCat.count || 0} उत्पाद</span>
              </div>
              <p style={{ fontSize: '13px', color: '#777', lineHeight: '1.7', margin: 0 }}>
                {viewCat.description || 'कोई विवरण उपलब्ध नहीं।'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', padding: '0 20px 24px' }}>
              <button onClick={() => { setViewCat(null); openEdit(viewCat._id); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#d35400', color: '#fff', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                <Pencil size={15} /> श्रेणी संपादित करें
              </button>
              <button onClick={() => setViewCat(null)} style={{ padding: '12px 20px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px', fontWeight: '500', color: '#666', backgroundColor: '#fff', cursor: 'pointer' }}>
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={() => setShowModal(false)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', backgroundColor: '#fff', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: '480px', boxShadow: '0 -4px 30px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '12px 0 0', textAlign: 'center' }}>
              <div style={{ width: '36px', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px', margin: '0 auto' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 14px', borderBottom: '1px solid #f0f0f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#222', margin: 0 }}>
                {editId ? 'श्रेणी संपादित करें' : 'श्रेणी जोड़ें'}
              </h3>
              <div onClick={() => setShowModal(false)} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} style={{ color: '#888' }} />
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>श्रेणी का नाम</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField('')} placeholder="सिल्क साड़ी" style={inputStyle('name')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>विवरण</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} onFocus={() => setFocusedField('desc')} onBlur={() => setFocusedField('')} placeholder="शुद्ध सिल्क से बनी साड़ियाँ" style={{ ...inputStyle('desc'), resize: 'none' as const }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>श्रेणी तस्वीर</label>
                  {form.image ? (
                    <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src={form.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => setForm({ ...form, image: '' })} style={{ position: 'absolute', top: '4px', right: '4px', width: '22px', height: '22px', backgroundColor: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <label style={{ display: 'block', border: '2px dashed #eee', borderRadius: '12px', padding: '28px', textAlign: 'center', cursor: 'pointer', opacity: uploading ? 0.5 : 1 }}>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                      <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>{uploading ? 'अपलोड हो रहा है...' : 'अपलोड करने के लिए क्लिक करें'}</p>
                    </label>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" disabled={saving} style={{ flex: 1, backgroundColor: '#d35400', color: '#fff', fontWeight: '600', padding: '12px', borderRadius: '12px', fontSize: '14px', border: 'none', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'सहेजा जा रहा है...' : editId ? 'अपडेट करें' : 'श्रेणी जोड़ें'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, border: '1px solid #eee', borderRadius: '12px', padding: '12px', fontSize: '14px', fontWeight: '500', color: '#666', backgroundColor: '#fff', cursor: 'pointer' }}>
                  रद्द करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
          backgroundColor: toast.type === 'success' ? '#059669' : '#dc2626',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideIn 0.3s ease',
        }}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>
          {toast.message}
        </div>
      )}
      <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </AdminLayout>
  );
}
