import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Grid3X3, Phone } from 'lucide-react';

const navItems = [
  { name: 'होम', path: '/', icon: Home },
  { name: 'साड़ियाँ', path: '/sarees', icon: ShoppingBag },
  { name: 'श्रेणियाँ', path: '/categories', icon: Grid3X3 },
  { name: 'संपर्क', path: '/contact', icon: Phone },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: 45,
        backgroundColor: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #f0ebe0',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '60px' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                textDecoration: 'none',
                position: 'relative',
                padding: '4px 16px',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '-1px',
                  width: '32px',
                  height: '2.5px',
                  backgroundColor: '#800020',
                  borderRadius: '2px',
                }} />
              )}
              <Icon
                size={20}
                style={{ color: isActive ? '#800020' : '#999' }}
              />
              <span style={{
                fontSize: '10px',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? '#800020' : '#999',
              }}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
