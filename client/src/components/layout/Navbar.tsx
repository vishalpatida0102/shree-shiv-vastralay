import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

const navLinks = [
  { name: 'होम', path: '/' },
  { name: 'साड़ियाँ', path: '/sarees' },
  { name: 'श्रेणियाँ', path: '/categories' },
  { name: 'हमारे बारे में', path: '/about' },
  { name: 'संपर्क करें', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { count } = useFavorites();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        .nav-desktop { display: none; }
        .nav-mobile-btn { display: block; }
        .nav-mobile-menu { display: flex; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
          .nav-mobile-btn { display: none; }
          .nav-mobile-menu { display: none; }
        }
      `}</style>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            {/* Logo - only visible on scroll */}
            <Link
              to="/"
              style={{
                opacity: isScrolled ? 1 : 0,
                transform: isScrolled ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity 0.3s, transform 0.3s',
                pointerEvents: isScrolled ? 'auto' : 'none',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img
                src="/logo.jpeg"
                alt="नागपुर वाला"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid #D4AF37',
                }}
              />
              <span className="font-heading" style={{ fontSize: '20px', fontWeight: '700', color: '#B8960C' }}>
                नागपुर वाला
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="nav-desktop" style={{ alignItems: 'center', gap: '32px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    position: 'relative',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: location.pathname === link.path ? '#B8960C' : '#2D2D2D',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#B8960C'}
                  onMouseLeave={(e) => e.currentTarget.style.color = location.pathname === link.path ? '#B8960C' : '#2D2D2D'}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      style={{ position: 'absolute', bottom: '-4px', left: '0', right: '0', height: '2px', backgroundColor: '#D4AF37', borderRadius: '1px' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Favorites Icon - Desktop */}
            <Link
              to="/favorites"
              className="nav-desktop"
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: location.pathname === '/favorites' ? 'rgba(184,150,12,0.1)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <Heart
                size={20}
                style={{
                  color: '#B8960C',
                  fill: location.pathname === '/favorites' ? '#B8960C' : 'none',
                }}
              />
              {count > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '0px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#B8960C',
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #fff',
                }}>
                  {count > 9 ? '9+' : count}
                </div>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-mobile-btn"
              style={{ padding: '8px', color: isScrolled ? '#2D2D2D' : '#fff', background: 'none', border: 'none', cursor: 'pointer', zIndex: 60, position: 'relative' }}
              aria-label="मेनू"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="nav-mobile-menu"
            style={{
              position: 'fixed',
              inset: '0',
              zIndex: 55,
              backgroundColor: '#fff',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
            }}
          >
            {/* Close button at top-right */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '8px',
                color: '#2D2D2D',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={26} />
            </button>

            {/* Brand */}
            <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src="/logo.jpeg"
                alt="नागपुर वाला"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #D4AF37',
                  marginBottom: '12px',
                  boxShadow: '0 4px 16px rgba(184,150,12,0.2)',
                }}
              />
              <span className="font-heading" style={{ fontSize: '28px', fontWeight: '700', color: '#B8960C' }}>
                नागपुर वाला
              </span>
              <p style={{ fontSize: '12px', color: '#999', marginTop: '6px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Nagpur Wala
              </p>
            </div>

            {/* Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100%', maxWidth: '280px' }}>
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    style={{ width: '100%' }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: 'block',
                        padding: '14px 24px',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: isActive ? '600' : '500',
                        textAlign: 'center',
                        textDecoration: 'none',
                        backgroundColor: isActive ? '#2D2D2D' : 'transparent',
                        color: isActive ? '#D4AF37' : '#2D2D2D',
                        transition: 'all 0.2s',
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Favorites Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
              style={{ width: '100%', maxWidth: '280px', marginTop: '8px' }}
            >
              <Link
                to="/favorites"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: location.pathname === '/favorites' ? '600' : '500',
                  textDecoration: 'none',
                  backgroundColor: location.pathname === '/favorites' ? '#2D2D2D' : 'transparent',
                  color: location.pathname === '/favorites' ? '#D4AF37' : '#2D2D2D',
                  transition: 'all 0.2s',
                }}
              >
                <Heart size={18} style={{ fill: location.pathname === '/favorites' ? '#fff' : 'none' }} />
                पसंदीदा
                {count > 0 && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    backgroundColor: location.pathname === '/favorites' ? 'rgba(255,255,255,0.2)' : 'rgba(184,150,12,0.1)',
                    color: location.pathname === '/favorites' ? '#D4AF37' : '#B8960C',
                    padding: '2px 8px',
                    borderRadius: '20px',
                  }}>
                    {count}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Bottom tagline */}
            <p className="font-heading" style={{ position: 'absolute', bottom: '32px', fontSize: '13px', color: '#D4AF37', textAlign: 'center' }}>
              जहाँ परंपरा मिलती है फैशन से
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
