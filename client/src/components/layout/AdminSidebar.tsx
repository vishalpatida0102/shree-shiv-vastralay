import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Grid3X3, LogOut, Menu, X, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { name: 'Home', path: '/admin/dashboard', icon: LayoutDashboard, color: 'text-orange-500' },
  { name: 'Products', path: '/admin/products', icon: ShoppingBag, color: 'text-blue-500' },
  { name: 'Categories', path: '/admin/categories', icon: Grid3X3, color: 'text-emerald-500' },
];

export default function AdminSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[250px] bg-white border-r border-[#f0f0f0] z-40 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ minHeight: '100vh' }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between border-b border-[#f0f0f0]"
          style={{ padding: '18px 20px' }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[#d35400] font-bold text-lg">Nagpur</span>
            <span className="text-[#999] font-normal text-lg">wala</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-[#bbb] hover:text-[#666]"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1" style={{ padding: '24px 12px 0' }}>
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center rounded-lg text-[14px] font-medium transition-all ${
                  isActive
                    ? `${item.color} bg-[#fff7f0]`
                    : 'text-[#666] hover:bg-[#fafafa]'
                }`}
                style={{
                  padding: '12px 14px',
                  gap: '12px',
                  marginTop: i > 0 ? '4px' : '0',
                }}
              >
                <Icon size={20} className={isActive ? item.color : 'text-[#aaa]'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div style={{ padding: '16px 12px' }} className="border-t border-[#f0f0f0]">
          <Link
            to="/admin"
            className="flex items-center rounded-lg text-[14px] font-medium text-[#bbb] hover:text-[#888] hover:bg-[#fafafa] transition-colors"
            style={{ padding: '12px 14px', gap: '12px' }}
          >
            <LogOut size={20} />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}
