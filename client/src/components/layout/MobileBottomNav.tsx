import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Grid3X3, Heart, Phone } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

const navItems = [
  { name: 'होम', path: '/', icon: Home },
  { name: 'साड़ियाँ', path: '/sarees', icon: ShoppingBag },
  { name: 'श्रेणियाँ', path: '/categories', icon: Grid3X3 },
  { name: 'पसंदीदा', path: '/favorites', icon: Heart },
  { name: 'संपर्क', path: '/contact', icon: Phone },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { count } = useFavorites();

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
          const isFavTab = item.path === '/favorites';

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
                padding: '4px 12px',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '-1px',
                  width: '32px',
                  height: '2.5px',
                  backgroundColor: '#B8960C',
                  borderRadius: '2px',
                }} />
              )}
              <div style={{ position: 'relative' }}>
                <Icon
                  size={20}
                  style={{
                    color: isActive ? '#B8960C' : '#999',
                    fill: isFavTab && isActive ? '#B8960C' : 'none',
                  }}
                />
                {isFavTab && count > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-6px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: '#B8960C',
                    color: '#fff',
                    fontSize: '8px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid #fff',
                  }}>
                    {count > 9 ? '9+' : count}
                  </div>
                )}
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? '#B8960C' : '#999',
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
