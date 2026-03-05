import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Eye, X } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { categories as dummyCategories, sarees } from '../../data/dummyData';
import type { Category } from '../../types';

export default function AdminCategories() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [viewCat, setViewCat] = useState<Category | null>(null);

  const filtered = dummyCategories.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const openNew = () => {
    setEditId(null);
    setForm({ name: '', description: '' });
    setShowModal(true);
  };

  const openEdit = (id: string) => {
    const cat = dummyCategories.find((c) => c.id === id);
    if (cat) {
      setEditId(id);
      setForm({ name: cat.name, description: cat.description });
      setShowModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <AdminLayout title="Hi, Admin 👋">
      {/* Heading */}
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-2xl font-bold text-[#222]">Category Management</h2>
        <p className="text-[#999] text-sm" style={{ marginTop: '4px' }}>
          Manage product categories
        </p>
      </div>

      {/* Filter Bar */}
      <div
        className="bg-white rounded-2xl border border-[#f0f0f0] flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        style={{ padding: '16px 20px', marginBottom: '24px' }}
      >
        <div style={{ position: 'relative', flex: '1' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }}
          />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '40px', paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: '#fff', color: '#333' }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '10px 16px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#555', backgroundColor: '#fff' }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={openNew}
          className="hover:bg-[#c0392b] transition-colors"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#d35400', color: '#fff', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f0f0]">
                <th className="text-left text-[11px] font-semibold text-[#aaa] uppercase tracking-wider" style={{ padding: '14px 24px' }}>
                  Name
                </th>
                <th className="text-left text-[11px] font-semibold text-[#aaa] uppercase tracking-wider hidden md:table-cell" style={{ padding: '14px 16px' }}>
                  Description
                </th>
                <th className="text-left text-[11px] font-semibold text-[#aaa] uppercase tracking-wider" style={{ padding: '14px 16px' }}>
                  Status
                </th>
                <th className="text-left text-[11px] font-semibold text-[#aaa] uppercase tracking-wider hidden sm:table-cell" style={{ padding: '14px 16px' }}>
                  Products
                </th>
                <th className="text-right text-[11px] font-semibold text-[#aaa] uppercase tracking-wider" style={{ padding: '14px 24px' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-[#f8f8f8] hover:bg-[#fafafa] transition-colors"
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div className="flex items-center" style={{ gap: '14px' }}>
                      <img
                        src={cat.image}
                        alt=""
                        className="rounded-lg object-cover"
                        style={{ width: '44px', height: '44px' }}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-[#333]">
                          {cat.name}
                        </p>
                        <p className="text-xs text-[#bbb] md:hidden" style={{ marginTop: '2px' }}>
                          {cat.description.length > 30 ? cat.description.slice(0, 30) + '...' : cat.description || '—'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell" style={{ padding: '16px' }}>
                    <span className="text-sm text-[#888]">
                      {cat.description.length > 50 ? cat.description.slice(0, 50) + '...' : cat.description || '—'}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
                      Active
                    </span>
                  </td>
                  <td className="hidden sm:table-cell" style={{ padding: '16px' }}>
                    <span className="text-sm font-medium text-[#555]">
                      {sarees.filter((s) => s.category === cat.id).length} products
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="flex items-center justify-end" style={{ gap: '6px' }}>
                      <button
                        onClick={() => setViewCat(cat)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#bbb] hover:text-[#d35400] hover:bg-orange-50 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openEdit(cat.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#bbb] hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#bbb] hover:text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-[#bbb] text-sm" style={{ padding: '48px 0' }}>
            No categories found
          </div>
        )}
      </div>

      {/* View Category Modal */}
      {viewCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setViewCat(null)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Image */}
            <div className="relative h-48">
              <img
                src={viewCat.image}
                alt={viewCat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setViewCat(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-[#555] hover:bg-white transition-colors"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-5">
                <h3 className="text-white text-xl font-bold">{viewCat.name}</h3>
              </div>
            </div>
            {/* Info */}
            <div style={{ padding: '24px' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
                  Active
                </span>
                <span className="text-sm font-medium text-[#888]">
                  {sarees.filter((s) => s.category === viewCat.id).length} products
                </span>
              </div>
              <p className="text-sm text-[#777] leading-relaxed">
                {viewCat.description || 'No description available.'}
              </p>
              <div className="flex gap-3" style={{ marginTop: '24px' }}>
                <button
                  onClick={() => {
                    setViewCat(null);
                    openEdit(viewCat.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#d35400] hover:bg-[#c0392b] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  <Pencil size={14} />
                  Edit Category
                </button>
                <button
                  onClick={() => setViewCat(null)}
                  className="flex-1 flex items-center justify-center py-2.5 border border-[#eee] rounded-lg text-sm font-medium text-[#666] hover:bg-[#fafafa] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div
              className="flex items-center justify-between border-b border-[#f0f0f0]"
              style={{ padding: '18px 24px' }}
            >
              <h3 className="text-lg font-bold text-[#222]">
                {editId ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#bbb] hover:text-[#333] hover:bg-[#f5f5f5] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              <div>
                <label className="block text-sm font-medium text-[#333]" style={{ marginBottom: '8px' }}>
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-[#eee] rounded-lg text-sm focus:outline-none focus:border-[#d35400]/30 bg-white text-[#333] placeholder-[#bbb]"
                  placeholder="सिल्क साड़ी"
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label className="block text-sm font-medium text-[#333]" style={{ marginBottom: '8px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 border border-[#eee] rounded-lg text-sm focus:outline-none focus:border-[#d35400]/30 bg-white text-[#333] placeholder-[#bbb] resize-none"
                  placeholder="शुद्ध सिल्क से बनी साड़ियाँ"
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label className="block text-sm font-medium text-[#333]" style={{ marginBottom: '8px' }}>
                  Category Image
                </label>
                <div className="border-2 border-dashed border-[#eee] rounded-lg text-center hover:border-[#d35400]/30 transition-colors cursor-pointer" style={{ padding: '32px' }}>
                  <p className="text-[#bbb] text-sm">
                    Click to upload or drag & drop
                  </p>
                </div>
              </div>

              <div className="flex gap-3" style={{ marginTop: '28px' }}>
                <button
                  type="submit"
                  className="flex-1 bg-[#d35400] hover:bg-[#c0392b] text-white font-semibold py-3 rounded-lg text-sm transition-colors"
                >
                  {editId ? 'Update' : 'Add Category'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-[#eee] text-[#666] font-medium py-3 rounded-lg text-sm hover:bg-[#fafafa] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
