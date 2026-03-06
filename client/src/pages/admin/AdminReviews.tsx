import { useState, useEffect } from 'react';
import { Star, Check, X, Trash2, Eye, MessageSquare, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { reviewsApi } from '../../services/api';
import type { ApiReview } from '../../services/api';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [viewReview, setViewReview] = useState<ApiReview | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    reviewsApi.getAll()
      .then(setReviews)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const updated = await reviewsApi.updateStatus(id, status);
      setReviews((prev) => prev.map((r) => r._id === id ? updated : r));
      if (viewReview?._id === id) setViewReview(updated);
    } catch (err: any) {
      alert(err.message || 'स्थिति अपडेट करने में विफल');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      await reviewsApi.delete(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      setConfirmDelete(null);
    } catch (err: any) {
      alert(err.message || 'हटाने में विफल');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.status === filter);
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  const statusConfig = {
    pending: { label: 'लंबित', color: '#d97706', bg: 'rgba(217,119,6,0.08)', icon: Clock },
    approved: { label: 'स्वीकृत', color: '#059669', bg: 'rgba(5,150,105,0.08)', icon: CheckCircle },
    rejected: { label: 'अस्वीकृत', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', icon: XCircle },
  };

  const filterTabs = [
    { key: 'all' as const, label: 'सभी', count: reviews.length },
    { key: 'pending' as const, label: 'लंबित', count: pendingCount },
    { key: 'approved' as const, label: 'स्वीकृत', count: reviews.filter(r => r.status === 'approved').length },
    { key: 'rejected' as const, label: 'अस्वीकृत', count: reviews.filter(r => r.status === 'rejected').length },
  ];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <AdminLayout title="Reviews">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
          <Loader2 size={28} style={{ color: '#d35400', animation: 'spin 1s linear infinite' }} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Reviews">
      {error && (
        <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>
      )}

      {/* Heading */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#222', margin: '0 0 4px 0' }}>समीक्षा प्रबंधन</h2>
        <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
          ग्राहक समीक्षाएँ प्रबंधित करें
          {pendingCount > 0 && (
            <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: '600', backgroundColor: 'rgba(217,119,6,0.1)', color: '#d97706', padding: '2px 8px', borderRadius: '20px' }}>
              {pendingCount} लंबित
            </span>
          )}
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', borderRadius: '10px',
              fontSize: '12px', fontWeight: filter === tab.key ? '600' : '500',
              backgroundColor: filter === tab.key ? '#d35400' : '#fff',
              color: filter === tab.key ? '#fff' : '#666',
              border: filter === tab.key ? 'none' : '1px solid #eee',
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}
          >
            {tab.label}
            <span style={{
              fontSize: '10px', fontWeight: '700',
              backgroundColor: filter === tab.key ? 'rgba(255,255,255,0.2)' : '#f5f5f5',
              color: filter === tab.key ? '#fff' : '#999',
              padding: '1px 6px', borderRadius: '20px',
            }}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((review) => {
          const sc = statusConfig[review.status];
          const StatusIcon = sc.icon;
          return (
            <div key={review._id} style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #f0f0f0', padding: '14px 16px', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #d35400, #e67e22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: '13px', fontWeight: '700' }}>{review.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#222', margin: 0 }}>{review.name}</p>
                    <p style={{ fontSize: '11px', color: '#999', margin: 0 }}>{review.location}</p>
                  </div>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px', backgroundColor: sc.bg, color: sc.color }}>
                  <StatusIcon size={11} />{sc.label}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} style={{ color: review.rating >= s ? '#D4AF37' : '#e0e0e0', fill: review.rating >= s ? '#D4AF37' : 'none' }} />
                ))}
                <span style={{ fontSize: '11px', color: '#999', marginLeft: '4px' }}>{formatDate(review.createdAt)}</span>
              </div>

              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{review.message}</p>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button onClick={() => setViewReview(review)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '500', backgroundColor: '#f5f5f5', color: '#666', border: 'none', cursor: 'pointer' }}>
                  <Eye size={12} /> देखें
                </button>
                {review.status !== 'approved' && (
                  <button onClick={() => handleUpdateStatus(review._id, 'approved')} disabled={actionLoading === review._id} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600', backgroundColor: 'rgba(5,150,105,0.08)', color: '#059669', border: 'none', cursor: 'pointer' }}>
                    <Check size={12} /> स्वीकृत करें
                  </button>
                )}
                {review.status !== 'rejected' && (
                  <button onClick={() => handleUpdateStatus(review._id, 'rejected')} disabled={actionLoading === review._id} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600', backgroundColor: 'rgba(220,38,38,0.06)', color: '#dc2626', border: 'none', cursor: 'pointer' }}>
                    <X size={12} /> अस्वीकृत करें
                  </button>
                )}
                <button onClick={() => setConfirmDelete(review._id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '500', backgroundColor: '#fff', color: '#ccc', border: '1px solid #eee', cursor: 'pointer' }}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#bbb', fontSize: '13px' }}>
          <MessageSquare size={32} style={{ color: '#ddd', margin: '0 auto 8px' }} />
          {filter === 'all' ? 'अभी कोई समीक्षा नहीं' : `कोई ${filter} समीक्षा नहीं`}
        </div>
      )}

      {/* View Review Modal */}
      {viewReview && (() => {
        const sc = statusConfig[viewReview.status];
        const StatusIcon = sc.icon;
        return (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div onClick={() => setViewReview(null)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
            <div style={{ position: 'relative', backgroundColor: '#fff', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: '480px', boxShadow: '0 -4px 30px rgba(0,0,0,0.15)' }}>
              <div style={{ padding: '12px 0 0', textAlign: 'center' }}><div style={{ width: '36px', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px', margin: '0 auto' }} /></div>
              <div style={{ padding: '16px 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #d35400, #e67e22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>{viewReview.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: '600', color: '#222', margin: 0 }}>{viewReview.name}</p>
                      <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{viewReview.location}</p>
                    </div>
                  </div>
                  <div onClick={() => setViewReview(null)} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <X size={16} style={{ color: '#888' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} style={{ color: viewReview.rating >= s ? '#D4AF37' : '#e0e0e0', fill: viewReview.rating >= s ? '#D4AF37' : 'none' }} />
                    ))}
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', backgroundColor: sc.bg, color: sc.color }}>
                    <StatusIcon size={12} />{sc.label}
                  </span>
                  <span style={{ fontSize: '11px', color: '#bbb' }}>{formatDate(viewReview.createdAt)}</span>
                </div>
                <div style={{ backgroundColor: '#fafafa', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', margin: 0 }}>{viewReview.message}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', padding: '0 20px 24px' }}>
                {viewReview.status !== 'approved' && (
                  <button onClick={() => handleUpdateStatus(viewReview._id, 'approved')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#059669', color: '#fff', padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                    <Check size={15} /> स्वीकृत करें
                  </button>
                )}
                {viewReview.status !== 'rejected' && (
                  <button onClick={() => handleUpdateStatus(viewReview._id, 'rejected')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#dc2626', color: '#fff', padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                    <X size={15} /> अस्वीकृत करें
                  </button>
                )}
                <button onClick={() => setViewReview(null)} style={{ padding: '12px 20px', border: '1px solid #eee', borderRadius: '12px', fontSize: '13px', fontWeight: '500', color: '#666', backgroundColor: '#fff', cursor: 'pointer' }}>बंद करें</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setConfirmDelete(null)} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', backgroundColor: '#fff', borderRadius: '16px', width: '90%', maxWidth: '340px', padding: '24px', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(220,38,38,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <Trash2 size={22} style={{ color: '#dc2626' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#222', margin: '0 0 6px' }}>समीक्षा हटाएं?</h3>
            <p style={{ fontSize: '13px', color: '#888', margin: '0 0 20px' }}>यह क्रिया पूर्ववत नहीं की जा सकती।</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #eee', fontSize: '13px', fontWeight: '500', color: '#666', backgroundColor: '#fff', cursor: 'pointer' }}>रद्द करें</button>
              <button onClick={() => handleDelete(confirmDelete)} disabled={actionLoading === confirmDelete} style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', fontSize: '13px', fontWeight: '600', color: '#fff', backgroundColor: '#dc2626', cursor: 'pointer', opacity: actionLoading === confirmDelete ? 0.7 : 1 }}>
                {actionLoading === confirmDelete ? 'हटाया जा रहा है...' : 'हटाएं'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
