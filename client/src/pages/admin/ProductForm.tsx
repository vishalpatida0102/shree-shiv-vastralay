import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft, Package, IndianRupee, Tag, Image, Sparkles, Loader2, ChevronDown, Check, Plus } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { productsApi, categoriesApi, uploadApi } from '../../services/api';
import type { ApiCategory } from '../../services/api';

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const fileRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: '',
    fabric: '',
    color: '',
    occasion: '',
    isNewArrival: false,
    isFeatured: false,
  });

  const [images, setImages] = useState<string[]>([]);

  const occasionOptions = ['शादी', 'त्योहार', 'पार्टी', 'कैज़ुअल', 'पूजा', 'रिसेप्शन', 'ऑफिस'];
  const [customOccasion, setCustomOccasion] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [occDropdownOpen, setOccDropdownOpen] = useState(false);
  const catDropRef = useRef<HTMLDivElement>(null);
  const occDropRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catDropRef.current && !catDropRef.current.contains(e.target as Node)) setCatDropdownOpen(false);
      if (occDropRef.current && !occDropRef.current.contains(e.target as Node)) setOccDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const cats = await categoriesApi.getAll();
        setCategories(cats);
        if (isEdit && id) {
          const product = await productsApi.getOne(id);
          const catId = typeof product.category === 'object' ? product.category._id : product.category;
          setForm({
            name: product.name,
            price: product.price.toString(),
            originalPrice: product.originalPrice?.toString() || '',
            description: product.description,
            category: catId,
            fabric: product.fabric,
            color: product.color,
            occasion: product.occasion,
            isNewArrival: product.isNewArrival,
            isFeatured: product.isFeatured,
          });
          setImages(product.images);
          if (product.occasion && !['शादी', 'त्योहार', 'पार्टी', 'कैज़ुअल', 'पूजा', 'रिसेप्शन', 'ऑफिस'].includes(product.occasion)) {
            setCustomOccasion(true);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setError('');
    try {
      for (const file of Array.from(files)) {
        const result = await uploadApi.image(file);
        setImages((prev) => [...prev, result.url]);
      }
    } catch (err: any) {
      setError(err.message || 'तस्वीर अपलोड विफल');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('कृपया कम से कम एक तस्वीर अपलोड करें');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const data = {
        name: form.name,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        description: form.description,
        category: form.category,
        fabric: form.fabric,
        color: form.color,
        occasion: form.occasion,
        isNewArrival: form.isNewArrival,
        isFeatured: form.isFeatured,
        images,
      };
      if (isEdit && id) {
        await productsApi.update(id, data);
      } else {
        await productsApi.create(data);
      }
      navigate('/admin/products', { state: { toast: isEdit ? 'उत्पाद सफलतापूर्वक अपडेट हुआ!' : 'उत्पाद सफलतापूर्वक बनाया गया!' } });
    } catch (err: any) {
      setError(err.message || 'उत्पाद सहेजने में विफल');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', border: '1px solid #eee', borderRadius: '10px',
    fontSize: '14px', outline: 'none', backgroundColor: '#fff', color: '#333', transition: 'border-color 0.2s',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px',
  };

  if (loading) {
    return (
      <AdminLayout title="Hi, Admin">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
          <Loader2 size={28} style={{ color: '#d35400', animation: 'spin 1s linear infinite' }} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Hi, Admin">
      <div style={{ marginBottom: '28px' }}>
        <button onClick={() => navigate('/admin/products')} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#999', background: 'none', border: 'none', cursor: 'pointer', padding: '0', marginBottom: '16px' }}>
          <ArrowLeft size={15} /> उत्पादों पर वापस
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#222', margin: '0' }}>{isEdit ? 'उत्पाद संपादित करें' : 'नया उत्पाद जोड़ें'}</h2>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '4px' }}>{isEdit ? 'उत्पाद विवरण और तस्वीरें अपडेट करें' : 'नया उत्पाद जोड़ने के लिए विवरण भरें'}</p>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Basic Info */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fff7f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={16} style={{ color: '#d35400' }} /></div>
              <div><h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>मूल जानकारी</h3><p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>उत्पाद का नाम, विवरण और कीमत</p></div>
            </div>
            <div style={{ padding: '24px' }}>
              <div>
                <label style={labelStyle}>उत्पाद का नाम (हिंदी)</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="बनारसी सिल्क साड़ी" onFocus={(e) => e.target.style.borderColor = '#d35400'} onBlur={(e) => e.target.style.borderColor = '#eee'} />
              </div>
              <div style={{ marginTop: '20px' }}>
                <label style={labelStyle}>विवरण (हिंदी)</label>
                <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: 'none' }} placeholder="शुद्ध बनारसी सिल्क साड़ी, सोने की ज़री का बारीक काम..." onFocus={(e) => e.target.style.borderColor = '#d35400'} onBlur={(e) => e.target.style.borderColor = '#eee'} />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IndianRupee size={16} style={{ color: '#16a34a' }} /></div>
              <div><h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>कीमत</h3><p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>उत्पाद की कीमत और छूट सेट करें</p></div>
            </div>
            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>कीमत (₹)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#bbb', fontSize: '14px', fontWeight: '600' }}>₹</span>
                  <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={{ ...inputStyle, paddingLeft: '32px' }} placeholder="12500" onFocus={(e) => e.target.style.borderColor = '#d35400'} onBlur={(e) => e.target.style.borderColor = '#eee'} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>मूल कीमत (₹) <span style={{ color: '#ccc', fontWeight: '400' }}>— वैकल्पिक</span></label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#bbb', fontSize: '14px', fontWeight: '600' }}>₹</span>
                  <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} style={{ ...inputStyle, paddingLeft: '32px' }} placeholder="15000" onFocus={(e) => e.target.style.borderColor = '#d35400'} onBlur={(e) => e.target.style.borderColor = '#eee'} />
                </div>
              </div>
              {form.price && form.originalPrice && Number(form.originalPrice) > Number(form.price) && (
                <div style={{ gridColumn: '1 / -1', backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={14} style={{ color: '#16a34a' }} />
                  <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>{Math.round(((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) * 100)}% छूट ग्राहकों को दिखाई जाएगी</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Tag size={16} style={{ color: '#3b82f6' }} /></div>
              <div><h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>उत्पाद विवरण</h3><p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>श्रेणी, कपड़ा, रंग और अवसर</p></div>
            </div>
            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div ref={catDropRef} style={{ position: 'relative' }}>
                <label style={labelStyle}>श्रेणी</label>
                <div
                  onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                  style={{ ...inputStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: catDropdownOpen ? '#d35400' : '#eee' }}
                >
                  <span style={{ color: form.category ? '#333' : '#aaa' }}>
                    {form.category ? categories.find(c => c._id === form.category)?.name || 'श्रेणी चुनें' : 'श्रेणी चुनें'}
                  </span>
                  <ChevronDown size={16} style={{ color: '#999', transition: 'transform 0.2s', transform: catDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </div>
                {catDropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', zIndex: 50, overflow: 'hidden', animation: 'dropIn 0.2s ease' }}>
                    <div style={{ maxHeight: '220px', overflowY: 'auto', padding: '6px' }}>
                      {categories.map((c) => (
                        <div
                          key={c._id}
                          onClick={() => { setForm({ ...form, category: c._id }); setCatDropdownOpen(false); }}
                          style={{ padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: form.category === c._id ? '#d35400' : '#333', backgroundColor: form.category === c._id ? '#fff7f0' : 'transparent', fontWeight: form.category === c._id ? '600' : '400', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => { if (form.category !== c._id) e.currentTarget.style.backgroundColor = '#f8f8f8'; }}
                          onMouseLeave={(e) => { if (form.category !== c._id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                          <span>{c.name}</span>
                          {form.category === c._id && <Check size={15} style={{ color: '#d35400' }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Hidden required input for form validation */}
                <input type="text" required value={form.category} onChange={() => {}} style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} tabIndex={-1} />
              </div>
              <div><label style={labelStyle}>कपड़ा (हिंदी)</label><input type="text" required value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} style={inputStyle} placeholder="शुद्ध सिल्क" onFocus={(e) => e.target.style.borderColor = '#d35400'} onBlur={(e) => e.target.style.borderColor = '#eee'} /></div>
              <div><label style={labelStyle}>रंग (हिंदी)</label><input type="text" required value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={inputStyle} placeholder="लाल" onFocus={(e) => e.target.style.borderColor = '#d35400'} onBlur={(e) => e.target.style.borderColor = '#eee'} /></div>
              <div ref={occDropRef} style={{ position: 'relative' }}>
                <label style={labelStyle}>अवसर (हिंदी)</label>
                {customOccasion ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} style={{ ...inputStyle, flex: 1 }} placeholder="कस्टम अवसर दर्ज करें" onFocus={(e) => e.target.style.borderColor = '#d35400'} onBlur={(e) => e.target.style.borderColor = '#eee'} autoFocus />
                    <div onClick={() => { setCustomOccasion(false); setForm({ ...form, occasion: '' }); }} style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #eee', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: '#fff', color: '#999', fontSize: '12px', whiteSpace: 'nowrap', transition: 'all 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#d35400'; e.currentTarget.style.color = '#d35400'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = '#999'; }}>
                      <X size={14} />
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => setOccDropdownOpen(!occDropdownOpen)}
                      style={{ ...inputStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: occDropdownOpen ? '#d35400' : '#eee' }}
                    >
                      <span style={{ color: form.occasion ? '#333' : '#aaa' }}>
                        {form.occasion || 'अवसर चुनें'}
                      </span>
                      <ChevronDown size={16} style={{ color: '#999', transition: 'transform 0.2s', transform: occDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </div>
                    {occDropdownOpen && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', zIndex: 50, overflow: 'hidden', animation: 'dropIn 0.2s ease' }}>
                        <div style={{ maxHeight: '220px', overflowY: 'auto', padding: '6px' }}>
                          {occasionOptions.map((o) => (
                            <div
                              key={o}
                              onClick={() => { setForm({ ...form, occasion: o }); setOccDropdownOpen(false); }}
                              style={{ padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: form.occasion === o ? '#d35400' : '#333', backgroundColor: form.occasion === o ? '#fff7f0' : 'transparent', fontWeight: form.occasion === o ? '600' : '400', transition: 'all 0.15s' }}
                              onMouseEnter={(e) => { if (form.occasion !== o) e.currentTarget.style.backgroundColor = '#f8f8f8'; }}
                              onMouseLeave={(e) => { if (form.occasion !== o) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              <span>{o}</span>
                              {form.occasion === o && <Check size={15} style={{ color: '#d35400' }} />}
                            </div>
                          ))}
                          <div style={{ borderTop: '1px solid #f0f0f0', margin: '4px 0' }} />
                          <div
                            onClick={() => { setCustomOccasion(true); setForm({ ...form, occasion: '' }); setOccDropdownOpen(false); }}
                            style={{ padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#d35400', fontWeight: '500', transition: 'all 0.15s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff7f0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <Plus size={14} />
                            <span>कस्टम</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fdf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} style={{ color: '#a855f7' }} /></div>
              <div><h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>उत्पाद टैग</h3><p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>इस उत्पाद को स्टोर पर हाइलाइट करें</p></div>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
              <label style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderRadius: '12px', border: form.isNewArrival ? '2px solid #d35400' : '1px solid #eee', backgroundColor: form.isNewArrival ? '#fff7f0' : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
                <input type="checkbox" checked={form.isNewArrival} onChange={(e) => setForm({ ...form, isNewArrival: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#d35400', cursor: 'pointer' }} />
                <div><p style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: '0' }}>नई आवक</p><p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>उत्पाद पर "नया" बैज दिखाएं</p></div>
              </label>
              <label style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderRadius: '12px', border: form.isFeatured ? '2px solid #d35400' : '1px solid #eee', backgroundColor: form.isFeatured ? '#fff7f0' : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: '#d35400', cursor: 'pointer' }} />
                <div><p style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: '0' }}>विशेष</p><p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>होमपेज विशेष सेक्शन में दिखाएं</p></div>
              </label>
            </div>
          </div>

          {/* Images */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fefce8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image size={16} style={{ color: '#ca8a04' }} /></div>
              <div><h3 style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: '0' }}>उत्पाद की तस्वीरें</h3><p style={{ fontSize: '12px', color: '#aaa', margin: '0' }}>उच्च गुणवत्ता वाली तस्वीरें अपलोड करें</p></div>
            </div>
            <div style={{ padding: '24px' }}>
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '14px' }}>
                {images.map((img, i) => (
                  <div key={i} style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={() => removeImage(i)} style={{ position: 'absolute', top: '6px', right: '6px', width: '24px', height: '24px', backgroundColor: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={12} /></button>
                    {i === 0 && (<div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', backgroundColor: 'rgba(211,84,0,0.85)', color: '#fff', textAlign: 'center', fontSize: '10px', fontWeight: '600', padding: '4px 0', letterSpacing: '0.5px' }}>COVER</div>)}
                  </div>
                ))}
                <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()} style={{ aspectRatio: '3/4', border: '2px dashed #ddd', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', color: uploading ? '#d35400' : '#bbb', backgroundColor: '#fafafa', cursor: uploading ? 'wait' : 'pointer', transition: 'all 0.2s' }}>
                  {uploading ? <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={22} />}
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>{uploading ? 'अपलोड हो रहा है...' : 'अपलोड करें'}</span>
                </button>
              </div>
              <p style={{ fontSize: '12px', color: '#bbb', marginTop: '14px' }}>पहली तस्वीर कवर फोटो के रूप में उपयोग होगी। अनुशंसित: 800x1000px, अधिकतम 5MB प्रत्येक।</p>
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: '12px', paddingBottom: '20px' }}>
            <button type="submit" disabled={saving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: saving ? '#b0440a' : '#d35400', color: '#fff', padding: '14px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.8 : 1 }}>
              {saving && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              {saving ? 'सहेजा जा रहा है...' : isEdit ? 'उत्पाद अपडेट करें' : 'उत्पाद बनाएं'}
            </button>
            <button type="button" onClick={() => navigate('/admin/products')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 32px', border: '1px solid #eee', borderRadius: '10px', fontSize: '14px', fontWeight: '500', color: '#666', backgroundColor: '#fff', cursor: 'pointer' }}>रद्द करें</button>
          </div>
        </div>
      </form>
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </AdminLayout>
  );
}
