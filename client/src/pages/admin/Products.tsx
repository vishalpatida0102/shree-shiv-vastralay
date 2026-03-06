import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search, Eye, X, ChevronLeft, ChevronRight, ChevronDown, Package, Loader2, AlertTriangle } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { productsApi, categoriesApi } from '../../services/api';
import type { ApiProduct, ApiCategory } from '../../services/api';
import { toSaree } from '../../services/helpers';
import type { Saree } from '../../types';

const ITEMS_PER_PAGE = 10;

export default function AdminProducts() {
  const location = useLocation();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [dropOpen, setDropOpen] = useState(false);
  const [viewSaree, setViewSaree] = useState<Saree | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Show toast from navigation (after create/edit)
  useEffect(() => {
    const state = location.state as { toast?: string } | null;
    if (state?.toast) {
      showToast(state.toast);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  // Fetch categories once
  useEffect(() => {
    categoriesApi.getAll()
      .then(setCategories)
      .catch((err) => setError(err.message));
  }, []);

  // Fetch products paginated — reset on category filter change
  const fetchProducts = useCallback(async (pageNum: number, append: boolean) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const params: { page: number; limit: number; category?: string } = {
        page: pageNum,
        limit: ITEMS_PER_PAGE,
      };
      if (filterCat) params.category = filterCat;

      const data = await productsApi.getPaginated(params);
      setProducts((prev) => append ? [...prev, ...data.products] : data.products);
      setTotal(data.total);
      setPage(pageNum);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filterCat]);

  useEffect(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  const getCatName = (p: ApiProduct) => {
    if (typeof p.category === 'object' && p.category) return p.category.name;
    const cat = categories.find((c) => c._id === p.category);
    return cat?.name || '';
  };

  // Client-side search filter (on loaded products)
  const filtered = products.filter((p) => {
    if (!search) return true;
    return p.name.includes(search) || p.fabric.includes(search);
  });

  const handleDelete = async (id: string) => {
    setConfirmDelete(null);
    setDeleting(id);
    try {
      await productsApi.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setTotal((prev) => prev - 1);
      showToast('उत्पाद सफलतापूर्वक हटाया गया!');
    } catch (err: any) {
      showToast(err.message || 'हटाने में विफल', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const openView = (p: ApiProduct) => {
    setViewSaree(toSaree(p));
    setActiveImg(0);
  };

  const closeView = () => {
    setViewSaree(null);
    setActiveImg(0);
  };

  const discount = viewSaree?.originalPrice
    ? Math.round(((viewSaree.originalPrice - viewSaree.price) / viewSaree.originalPrice) * 100)
    : 0;

  const hasMore = products.length < total;

  if (loading) {
    return (
      <AdminLayout title="Products">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
          <Loader2 size={28} style={{ color: '#d35400', animation: 'spin 1s linear infinite' }} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Products">
      {error && (
        <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {/* Heading */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#222', margin: '0 0 4px 0' }}>उत्पाद प्रबंधन</h2>
        <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>उत्पाद और इन्वेंटरी प्रबंधित करें ({total} कुल)</p>
      </div>

      {/* Filter Bar */}
      <div id="prod-filter" style={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        border: '1px solid #f0f0f0',
        padding: '14px 16px',
        marginBottom: '20px',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
          <input
            type="text"
            placeholder="उत्पाद खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '38px', paddingRight: '14px', paddingTop: '10px', paddingBottom: '10px', border: '1px solid #eee', borderRadius: '10px', fontSize: '13px', outline: 'none', backgroundColor: '#fafafa', color: '#333', boxSizing: 'border-box' as const }}
          />
        </div>
        {/* Category Select + Add */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
            <div
              onClick={() => setDropOpen(!dropOpen)}
              style={{
                width: '100%',
                padding: '9px 32px 9px 12px',
                border: dropOpen ? '1.5px solid #d35400' : '1px solid #eee',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '500',
                color: filterCat ? '#333' : '#999',
                backgroundColor: dropOpen ? '#fff' : '#fafafa',
                boxSizing: 'border-box' as const,
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {filterCat ? categories.find(c => c._id === filterCat)?.name : 'सभी श्रेणियाँ'}
            </div>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: dropOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)', pointerEvents: 'none', color: dropOpen ? '#d35400' : '#aaa', transition: 'all 0.2s' }} />
            {dropOpen && (
              <>
                <div onClick={() => setDropOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 30 }} />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                  backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 31, overflow: 'hidden',
                  maxHeight: '200px', overflowY: 'auto',
                }}>
                  {[{ _id: '', name: 'सभी श्रेणियाँ' }, ...categories].map((c) => (
                    <div
                      key={c._id}
                      onClick={() => { setFilterCat(c._id); setDropOpen(false); }}
                      style={{
                        padding: '10px 14px',
                        fontSize: '12px',
                        fontWeight: filterCat === c._id ? '600' : '400',
                        color: filterCat === c._id ? '#d35400' : '#555',
                        backgroundColor: filterCat === c._id ? 'rgba(211,84,0,0.06)' : '#fff',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f5f5f5',
                        transition: 'all 0.15s',
                      }}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <Link
            to="/admin/products/new"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
              backgroundColor: '#d35400', color: '#fff', padding: '9px 16px', borderRadius: '10px',
              fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0,
            }}
          >
            <Plus size={14} />
            जोड़ें
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <th style={{ textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px' }}>उत्पाद</th>
                <th className="hidden md:table-cell" style={{ textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px' }}>श्रेणी</th>
                <th style={{ textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px' }}>कीमत</th>
                <th className="hidden sm:table-cell" style={{ textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px' }}>स्थिति</th>
                <th style={{ textAlign: 'right', fontSize: '11px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px' }}>कार्रवाई</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product._id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={product.images[0]} alt="" style={{ width: '40px', height: '50px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#333', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{product.name}</p>
                        <p className="md:hidden" style={{ fontSize: '11px', color: '#bbb', margin: '2px 0 0' }}>{getCatName(product)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell" style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '13px', color: '#888' }}>{getCatName(product)}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>₹{product.price.toLocaleString('hi-IN')}</span>
                    {product.originalPrice && (
                      <p style={{ fontSize: '11px', color: '#ccc', textDecoration: 'line-through', margin: '2px 0 0' }}>₹{product.originalPrice.toLocaleString('hi-IN')}</p>
                    )}
                  </td>
                  <td className="hidden sm:table-cell" style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-block', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px',
                      backgroundColor: product.inStock ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                      color: product.inStock ? '#059669' : '#dc2626',
                    }}>
                      {product.inStock ? 'सक्रिय' : 'निष्क्रिय'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <div onClick={() => openView(product)} style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#bbb' }}>
                        <Eye size={16} />
                      </div>
                      <Link to={`/admin/products/edit/${product._id}`} style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', textDecoration: 'none' }}>
                        <Pencil size={16} />
                      </Link>
                      <div
                        onClick={() => setConfirmDelete({ id: product._id, name: product.name })}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: deleting === product._id ? '#d35400' : '#bbb' }}
                      >
                        {deleting === product._id ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={16} />}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#bbb', fontSize: '13px' }}>
            <Package size={32} style={{ color: '#ddd', margin: '0 auto 8px' }} />
            कोई उत्पाद नहीं मिला
          </div>
        )}

        {/* Load More */}
        {hasMore && !search && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 20px' }}>
            <button
              onClick={() => fetchProducts(page + 1, true)}
              disabled={loadingMore}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#fff',
                color: '#d35400',
                border: '1.5px solid #d35400',
                padding: '10px 24px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: loadingMore ? 'not-allowed' : 'pointer',
                opacity: loadingMore ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
            >
              {loadingMore && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
              {loadingMore ? 'लोड हो रहा है...' : `और देखें (${total - products.length} और)`}
            </button>
          </div>
        )}
      </div>

      {/* View Product Modal */}
      {viewSaree && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={closeView} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          <div style={{
            position: 'relative',
            backgroundColor: '#fff',
            borderRadius: '20px 20px 0 0',
            width: '100%',
            maxWidth: '720px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -4px 30px rgba(0,0,0,0.15)',
          }}>
            <div style={{ padding: '12px 20px 0', textAlign: 'center' }}>
              <div style={{ width: '36px', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px', margin: '0 auto 14px' }} />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 20px 14px', borderBottom: '1px solid #f0f0f0',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#222', margin: 0 }}>उत्पाद विवरण</h3>
              <div onClick={closeView} style={{
                width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f5f5f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <X size={16} style={{ color: '#888' }} />
              </div>
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#f5f0eb', aspectRatio: '4/3' }}>
                  <img src={viewSaree.images[activeImg]} alt={viewSaree.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {viewSaree.images.length > 1 && (
                    <>
                      <div
                        onClick={() => setActiveImg(p => p === 0 ? viewSaree.images.length - 1 : p - 1)}
                        style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                      >
                        <ChevronLeft size={16} style={{ color: '#333' }} />
                      </div>
                      <div
                        onClick={() => setActiveImg(p => p === viewSaree.images.length - 1 ? 0 : p + 1)}
                        style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                      >
                        <ChevronRight size={16} style={{ color: '#333' }} />
                      </div>
                    </>
                  )}
                  <div style={{ position: 'absolute', bottom: '8px', right: '10px', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '10px' }}>
                    {activeImg + 1}/{viewSaree.images.length}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  {viewSaree.images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        width: '48px', height: '56px', borderRadius: '8px', overflow: 'hidden',
                        border: i === activeImg ? '2px solid #d35400' : '2px solid transparent',
                        opacity: i === activeImg ? 1 : 0.5, cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '10px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#222', margin: 0, lineHeight: '1.3' }}>{viewSaree.name}</h2>
                  <span style={{
                    flexShrink: 0, fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px',
                    backgroundColor: viewSaree.inStock ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                    color: viewSaree.inStock ? '#059669' : '#dc2626',
                  }}>
                    {viewSaree.inStock ? 'सक्रिय' : 'निष्क्रिय'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '22px', fontWeight: '700', color: '#d35400' }}>₹{viewSaree.price.toLocaleString('hi-IN')}</span>
                  {viewSaree.originalPrice && (
                    <span style={{ fontSize: '14px', color: '#ccc', textDecoration: 'line-through' }}>₹{viewSaree.originalPrice.toLocaleString('hi-IN')}</span>
                  )}
                  {discount > 0 && (
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', backgroundColor: 'rgba(5,150,105,0.08)', padding: '3px 8px', borderRadius: '6px' }}>{discount}% छूट</span>
                  )}
                </div>

                <p style={{ fontSize: '13px', color: '#777', lineHeight: '1.8', margin: '0 0 16px' }}>{viewSaree.description}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  {[
                    { label: 'श्रेणी', value: viewSaree.categoryName || '—', color: '#d35400', bg: 'rgba(211,84,0,0.05)' },
                    { label: 'कपड़ा', value: viewSaree.fabric, color: '#2563eb', bg: 'rgba(37,99,235,0.05)' },
                    { label: 'रंग', value: viewSaree.color, color: '#7c3aed', bg: 'rgba(124,58,237,0.05)' },
                    { label: 'अवसर', value: viewSaree.occasion, color: '#059669', bg: 'rgba(5,150,105,0.05)' },
                  ].map(d => (
                    <div key={d.label} style={{ backgroundColor: d.bg, borderRadius: '10px', padding: '10px 12px' }}>
                      <p style={{ fontSize: '10px', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px' }}>{d.label}</p>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: d.color, margin: 0 }}>{d.value}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {viewSaree.isNew && (
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', backgroundColor: 'rgba(37,99,235,0.08)', color: '#2563eb' }}>नई आवक</span>
                  )}
                  {viewSaree.isFeatured && (
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', backgroundColor: 'rgba(211,84,0,0.08)', color: '#d35400' }}>विशेष</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex', gap: '10px', padding: '14px 20px',
              borderTop: '1px solid #f0f0f0', backgroundColor: '#fff',
              paddingBottom: '20px',
            }}>
              <Link
                to={`/admin/products/edit/${viewSaree.id}`}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  backgroundColor: '#d35400', color: '#fff', padding: '12px', borderRadius: '12px',
                  fontSize: '14px', fontWeight: '600', textDecoration: 'none',
                }}
              >
                <Pencil size={15} />
                उत्पाद संपादित करें
              </Link>
              <button
                onClick={closeView}
                style={{
                  padding: '12px 20px', border: '1px solid #eee', borderRadius: '12px',
                  fontSize: '14px', fontWeight: '500', color: '#666', backgroundColor: '#fff', cursor: 'pointer',
                }}
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Dialog */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={() => setConfirmDelete(null)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
          <div style={{
            position: 'relative',
            backgroundColor: '#fff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '380px',
            padding: '32px 28px 24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            animation: 'modalIn 0.25s ease',
            textAlign: 'center',
          }}>
            {/* Warning Icon */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: 'rgba(220,38,38,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 18px',
            }}>
              <AlertTriangle size={26} style={{ color: '#dc2626' }} />
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#222', margin: '0 0 8px' }}>उत्पाद हटाएं?</h3>
            <p style={{ fontSize: '13px', color: '#888', margin: '0 0 6px', lineHeight: '1.5' }}>
              क्या आप इसे हटाना चाहते हैं
            </p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: '0 0 24px', lineHeight: '1.4' }}>
              "{confirmDelete.name}"
            </p>
            <p style={{ fontSize: '12px', color: '#bbb', margin: '0 0 24px' }}>
              यह क्रिया पूर्ववत नहीं की जा सकती।
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid #e5e5e5', backgroundColor: '#fff',
                  fontSize: '14px', fontWeight: '600', color: '#666',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
              >
                रद्द करें
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: '12px',
                  border: 'none', backgroundColor: '#dc2626',
                  fontSize: '14px', fontWeight: '600', color: '#fff',
                  cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#b91c1c'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#dc2626'; }}
              >
                <Trash2 size={15} />
                हटाएं
              </button>
            </div>
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
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </AdminLayout>
  );
}
