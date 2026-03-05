import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { sarees, categories } from '../../data/dummyData';
import type { Saree } from '../../types';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [viewSaree, setViewSaree] = useState<Saree | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  const filtered = sarees.filter((s) => {
    const matchSearch = s.name.includes(search) || s.fabric.includes(search);
    const matchCat = !filterCat || s.category === filterCat;
    return matchSearch && matchCat;
  });

  const openView = (saree: Saree) => {
    setViewSaree(saree);
    setActiveImg(0);
  };

  const closeView = () => {
    setViewSaree(null);
    setActiveImg(0);
  };

  return (
    <AdminLayout title="Hi, Admin 👋">
      {/* Heading */}
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-2xl font-bold text-[#222]">Product Management</h2>
        <p className="text-[#999] text-sm" style={{ marginTop: '4px' }}>
          Manage products and inventory
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
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '40px', paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: '#fff', color: '#333' }}
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          style={{ padding: '10px 16px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#555', backgroundColor: '#fff' }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <Link
          to="/admin/products/new"
          className="hover:bg-[#c0392b] transition-colors"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#d35400', color: '#fff', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', textDecoration: 'none' }}
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f0f0]">
                <th className="text-left text-[11px] font-semibold text-[#aaa] uppercase tracking-wider" style={{ padding: '14px 24px' }}>
                  Product
                </th>
                <th className="text-left text-[11px] font-semibold text-[#aaa] uppercase tracking-wider hidden md:table-cell" style={{ padding: '14px 16px' }}>
                  Category
                </th>
                <th className="text-left text-[11px] font-semibold text-[#aaa] uppercase tracking-wider" style={{ padding: '14px 16px' }}>
                  Price
                </th>
                <th className="text-left text-[11px] font-semibold text-[#aaa] uppercase tracking-wider hidden sm:table-cell" style={{ padding: '14px 16px' }}>
                  Status
                </th>
                <th className="text-right text-[11px] font-semibold text-[#aaa] uppercase tracking-wider" style={{ padding: '14px 24px' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((saree) => (
                <tr
                  key={saree.id}
                  className="border-b border-[#f8f8f8] hover:bg-[#fafafa] transition-colors"
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div className="flex items-center" style={{ gap: '14px' }}>
                      <img
                        src={saree.images[0]}
                        alt=""
                        className="w-11 h-13 rounded-lg object-cover"
                        style={{ width: '44px', height: '52px' }}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-[#333] truncate max-w-[220px]">
                          {saree.name}
                        </p>
                        <p className="text-xs text-[#bbb] md:hidden" style={{ marginTop: '2px' }}>
                          {categories.find((c) => c.id === saree.category)?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell" style={{ padding: '16px' }}>
                    <span className="text-sm text-[#888]">
                      {categories.find((c) => c.id === saree.category)?.name}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div>
                      <span className="font-semibold text-sm text-[#333]">
                        ₹{saree.price.toLocaleString('hi-IN')}
                      </span>
                      {saree.originalPrice && (
                        <p className="text-xs text-[#ccc] line-through" style={{ marginTop: '2px' }}>
                          ₹{saree.originalPrice.toLocaleString('hi-IN')}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell" style={{ padding: '16px' }}>
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                        saree.inStock
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-red-50 text-red-500'
                      }`}
                    >
                      {saree.inStock ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="flex items-center justify-end" style={{ gap: '6px' }}>
                      <button
                        onClick={() => openView(saree)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#bbb] hover:text-[#d35400] hover:bg-orange-50 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <Link
                        to={`/admin/products/edit/${saree.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#bbb] hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>
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
            No products found
          </div>
        )}
      </div>

      {/* View Product Modal */}
      {viewSaree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeView}
          />
          <div
            className="relative bg-white rounded-2xl w-full max-w-[720px] shadow-2xl overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between border-b border-[#f0f0f0]"
              style={{ padding: '18px 24px' }}
            >
              <h3 className="text-lg font-bold text-[#222]">Product Details</h3>
              <button
                onClick={closeView}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#bbb] hover:text-[#333] hover:bg-[#f5f5f5] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 70px)' }}>
              <div className="flex flex-col md:flex-row">
                {/* Image Gallery */}
                <div className="md:w-[280px] flex-shrink-0" style={{ padding: '24px' }}>
                  <div className="relative rounded-xl overflow-hidden bg-[#f8f8f8]" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={viewSaree.images[activeImg]}
                      alt={viewSaree.name}
                      className="w-full h-full object-cover"
                    />
                    {viewSaree.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImg((prev) => (prev === 0 ? viewSaree.images.length - 1 : prev - 1))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#555] hover:bg-white shadow-sm transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setActiveImg((prev) => (prev === viewSaree.images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#555] hover:bg-white shadow-sm transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </div>
                  {/* Thumbnails */}
                  {viewSaree.images.length > 1 && (
                    <div className="flex gap-2" style={{ marginTop: '12px' }}>
                      {viewSaree.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`w-12 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                            i === activeImg ? 'border-[#d35400]' : 'border-transparent hover:border-[#ddd]'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1" style={{ padding: '24px 24px 24px 0' }}>
                  {/* Name & Status */}
                  <div className="flex items-start justify-between" style={{ gap: '12px' }}>
                    <h2 className="text-xl font-bold text-[#222] leading-tight">{viewSaree.name}</h2>
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${
                        viewSaree.inStock
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-red-50 text-red-500'
                      }`}
                    >
                      {viewSaree.inStock ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3" style={{ marginTop: '12px' }}>
                    <span className="text-2xl font-bold text-[#d35400]">
                      ₹{viewSaree.price.toLocaleString('hi-IN')}
                    </span>
                    {viewSaree.originalPrice && (
                      <span className="text-base text-[#ccc] line-through">
                        ₹{viewSaree.originalPrice.toLocaleString('hi-IN')}
                      </span>
                    )}
                    {viewSaree.originalPrice && (
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {Math.round(((viewSaree.originalPrice - viewSaree.price) / viewSaree.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#777] leading-relaxed" style={{ marginTop: '16px' }}>
                    {viewSaree.description}
                  </p>

                  {/* Details Grid */}
                  <div
                    className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#f0f0f0]"
                    style={{ marginTop: '20px', paddingTop: '20px' }}
                  >
                    <div>
                      <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-wider">Category</p>
                      <p className="text-sm text-[#333] font-medium" style={{ marginTop: '4px' }}>
                        {categories.find((c) => c.id === viewSaree.category)?.name || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-wider">Fabric</p>
                      <p className="text-sm text-[#333] font-medium" style={{ marginTop: '4px' }}>
                        {viewSaree.fabric}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-wider">Color</p>
                      <p className="text-sm text-[#333] font-medium" style={{ marginTop: '4px' }}>
                        {viewSaree.color}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-wider">Occasion</p>
                      <p className="text-sm text-[#333] font-medium" style={{ marginTop: '4px' }}>
                        {viewSaree.occasion}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 border-t border-[#f0f0f0]" style={{ marginTop: '20px', paddingTop: '20px' }}>
                    {viewSaree.isNew && (
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                        New Arrival
                      </span>
                    )}
                    {viewSaree.isFeatured && (
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-[#d35400]">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '12px' }}>
                    <Link
                      to={`/admin/products/edit/${viewSaree.id}`}
                      className="hover:bg-[#c0392b] transition-colors"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#d35400', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}
                    >
                      <Pencil size={14} />
                      Edit Product
                    </Link>
                    <button
                      onClick={closeView}
                      className="hover:bg-[#fafafa] transition-colors"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 20px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#666', backgroundColor: '#fff', cursor: 'pointer' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
