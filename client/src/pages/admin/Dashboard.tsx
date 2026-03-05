import { Link } from 'react-router-dom';
import { ShoppingBag, Grid3X3, TrendingUp, Eye, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { sarees, categories } from '../../data/dummyData';

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Products',
      value: sarees.length,
      icon: ShoppingBag,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      trend: '+4.2%',
      trendUp: true,
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: Grid3X3,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      trend: '+1.8%',
      trendUp: true,
    },
    {
      label: 'Featured',
      value: sarees.filter((s) => s.isFeatured).length,
      icon: TrendingUp,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
      trend: '-2.1%',
      trendUp: false,
    },
    {
      label: 'New Arrivals',
      value: sarees.filter((s) => s.isNew).length,
      icon: Eye,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
      trend: '+0.7%',
      trendUp: true,
    },
  ];

  return (
    <AdminLayout title="Hi, Admin 👋">
      {/* Heading */}
      <div style={{ marginBottom: '32px' }}>
        <h2 className="text-2xl font-bold text-[#222]">Store Overview</h2>
        <p className="text-[#999] text-sm" style={{ marginTop: '6px' }}>
          Get a detailed overview of your products, categories, and store performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5" style={{ marginBottom: '32px' }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-[#f0f0f0]"
              style={{ padding: '24px' }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <Icon size={20} className={stat.iconColor} />
                </div>
                <button className="text-[#ccc] hover:text-[#999]">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <p className="text-3xl font-bold text-[#222]">{stat.value}</p>
              <p className="text-[#999] text-sm" style={{ marginTop: '4px' }}>{stat.label}</p>
              <div className="flex items-center gap-1" style={{ marginTop: '12px' }}>
                {stat.trendUp ? (
                  <ArrowUpRight size={14} className="text-emerald-500" />
                ) : (
                  <ArrowDownRight size={14} className="text-red-400" />
                )}
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-emerald-500' : 'text-red-400'}`}>
                  {stat.trend}
                </span>
                <span className="text-[#ccc] text-xs">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Products */}
        <div className="bg-white rounded-2xl border border-[#f0f0f0]">
          <div className="flex items-center justify-between" style={{ padding: '20px 24px' }}>
            <h3 className="font-semibold text-[#222]">Recent Products</h3>
            <Link
              to="/admin/products"
              className="text-xs text-[#d35400] font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          <div>
            {sarees.slice(0, 5).map((saree, i) => (
              <div
                key={saree.id}
                className={`flex items-center gap-4 hover:bg-[#fafafa] transition-colors ${
                  i !== 0 ? 'border-t border-[#f5f5f5]' : ''
                }`}
                style={{ padding: '14px 24px' }}
              >
                <img
                  src={saree.images[0]}
                  alt={saree.name}
                  className="w-10 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-[#333] truncate">
                    {saree.name}
                  </h4>
                  <p className="text-xs text-[#aaa]">{saree.fabric}</p>
                </div>
                <span className="font-semibold text-sm text-[#222] whitespace-nowrap">
                  ₹{saree.price.toLocaleString('hi-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-2xl border border-[#f0f0f0]">
          <div className="flex items-center justify-between" style={{ padding: '20px 24px' }}>
            <h3 className="font-semibold text-[#222]">Top Categories</h3>
            <Link
              to="/admin/categories"
              className="text-xs text-[#d35400] font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          <div>
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                className={`flex items-center gap-4 hover:bg-[#fafafa] transition-colors ${
                  i !== 0 ? 'border-t border-[#f5f5f5]' : ''
                }`}
                style={{ padding: '14px 24px' }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-[#333]">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-[#aaa]">{cat.count} products</p>
                </div>
                <span className="text-sm font-semibold text-[#888]">#{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
