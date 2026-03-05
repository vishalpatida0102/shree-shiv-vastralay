import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
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
              }}
            >
              <span className="font-heading" style={{ fontSize: '20px', fontWeight: '700', color: '#800020' }}>
                नागपुर वाला
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    position: 'relative',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: location.pathname === link.path ? '#800020' : '#2D2D2D',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#800020'}
                  onMouseLeave={(e) => e.currentTarget.style.color = location.pathname === link.path ? '#800020' : '#2D2D2D'}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              style={{ padding: '8px', color: '#800020', background: 'none', border: 'none', cursor: 'pointer', zIndex: 60, position: 'relative' }}
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
            className="md:hidden"
            style={{
              position: 'fixed',
              inset: '0',
              zIndex: 55,
              backgroundColor: '#fff',
              display: 'flex',
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
                color: '#800020',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={26} />
            </button>

            {/* Brand */}
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
              <span className="font-heading" style={{ fontSize: '28px', fontWeight: '700', color: '#800020' }}>
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
                        backgroundColor: isActive ? '#800020' : 'transparent',
                        color: isActive ? '#fff' : '#2D2D2D',
                        transition: 'all 0.2s',
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

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
