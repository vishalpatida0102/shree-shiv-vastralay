import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Grid3X3, MessageSquare, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { name: 'डैशबोर्ड', path: '/admin/dashboard', icon: LayoutDashboard, color: '#d35400', bg: 'rgba(211,84,0,0.08)' },
  { name: 'उत्पाद', path: '/admin/products', icon: ShoppingBag, color: '#2563eb', bg: 'rgba(37,99,235,0.08)' },
  { name: 'श्रेणियाँ', path: '/admin/categories', icon: Grid3X3, color: '#059669', bg: 'rgba(5,150,105,0.08)' },
  { name: 'समीक्षाएँ', path: '/admin/reviews', icon: MessageSquare, color: '#d97706', bg: 'rgba(217,119,6,0.08)' },
  { name: 'वेबसाइट सेटिंग्स', path: '/admin/settings', icon: Settings, color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const { pendingCount } = useReviews();
  const { logout } = useAuth();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 40,
          }}
          className="lg:hidden"
        />
      )}

      {/* Sidebar */}
      <style>{`
        #admin-sidebar { transform: translateX(-100%); }
        #admin-sidebar.open { transform: translateX(0); }
        @media (min-width: 1024px) { #admin-sidebar { transform: translateX(0) !important; } }
      `}</style>
      <aside
        id="admin-sidebar"
        className={isOpen ? 'open' : ''}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '250px',
          backgroundColor: '#fff',
          borderRight: '1px solid #f0f0f0',
          zIndex: 45,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ color: '#d35400', fontWeight: '700', fontSize: '18px' }}>Nagpur</span>
            <span style={{ color: '#999', fontWeight: '400', fontSize: '18px' }}>wala</span>
          </div>
          <div
            onClick={onClose}
            className="lg:hidden"
            style={{ cursor: 'pointer', color: '#bbb', display: 'flex', alignItems: 'center' }}
          >
            <ChevronLeft size={18} />
          </div>
        </div>

        {/* Label */}
        <div style={{ padding: '20px 20px 8px' }}>
          <span style={{ fontSize: '10px', fontWeight: '600', color: '#bbb', textTransform: 'uppercase', letterSpacing: '1px' }}>
            मेनू
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? item.color : '#666',
                  backgroundColor: isActive ? item.bg : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  marginBottom: '2px',
                }}
              >
                <Icon size={20} style={{ color: isActive ? item.color : '#aaa' }} />
                <span style={{ flex: 1 }}>{item.name}</span>
                {item.path === '/admin/reviews' && pendingCount > 0 && (
                  <span style={{
                    fontSize: '10px', fontWeight: '700', minWidth: '18px', height: '18px',
                    borderRadius: '20px', backgroundColor: '#d97706', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 5px',
                  }}>
                    {pendingCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid #f0f0f0' }}>
          <button
            onClick={() => { logout(); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 14px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#bbb',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <LogOut size={20} />
            लॉगआउट
          </button>
        </div>
      </aside>
    </>
  );
}
