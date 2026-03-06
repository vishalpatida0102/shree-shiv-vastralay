import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { shopInfo } from '../../data/dummyData';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2D2D2D', color: '#fff', paddingBottom: '100px' }} className="md:pb-8">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px 0' }}>

        {/* Top Section - Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '36px' }}>
          <img
            src="/logo.jpeg"
            alt={shopInfo.name}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid #D4AF37',
              marginBottom: '12px',
            }}
          />
          <h3 className="font-heading" style={{ fontSize: '28px', fontWeight: '700', color: '#D4AF37', marginBottom: '10px' }}>
            {shopInfo.name}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', maxWidth: '320px', textAlign: 'center', lineHeight: '1.7' }}>
            {shopInfo.tagline}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: '32px' }} />

        {/* Grid - 2 cols on mobile, 3 on desktop */}
        <style>{`
          #footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px 24px; }
          #footer-address { grid-column: 1 / -1; }
          @media (min-width: 768px) {
            #footer-grid { grid-template-columns: 1fr 1fr 1fr; }
            #footer-address { grid-column: auto; }
          }
        `}</style>
        <div id="footer-grid">
          {/* Quick Links */}
          <div>
            <h4 className="font-heading" style={{ fontSize: '16px', fontWeight: '600', color: '#D4AF37', marginBottom: '16px' }}>
              त्वरित लिंक
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'होम', path: '/' },
                { name: 'साड़ियाँ', path: '/sarees' },
                { name: 'श्रेणियाँ', path: '/categories' },
                { name: 'हमारे बारे में', path: '/about' },
                { name: 'संपर्क करें', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#D4AF37'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading" style={{ fontSize: '16px', fontWeight: '600', color: '#D4AF37', marginBottom: '16px' }}>
              संपर्क
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`tel:${shopInfo.phone}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}
              >
                <Phone size={14} style={{ flexShrink: 0 }} />
                <span>7999665102<br />9752873734</span>
              </a>
              <a
                href={`mailto:${shopInfo.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none', wordBreak: 'break-all' }}
              >
                <Mail size={14} style={{ flexShrink: 0 }} />
                {shopInfo.email}
              </a>
              <a
                href={shopInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}
              >
                <Instagram size={14} style={{ flexShrink: 0 }} />
                @nagpur_wala04
              </a>
            </div>
          </div>

          {/* Address - full width on mobile, single col on desktop */}
          <div id="footer-address">
            <h4 className="font-heading" style={{ fontSize: '16px', fontWeight: '600', color: '#D4AF37', marginBottom: '16px' }}>
              पता
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.7' }}>
              <MapPin size={14} style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>{shopInfo.address}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '36px', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>
            &copy; {new Date().getFullYear()} {shopInfo.name}। सभी अधिकार सुरक्षित।
          </p>
          <Link
            to="/admin"
            style={{ color: 'rgba(255,255,255,0.15)', fontSize: '11px', textDecoration: 'none', marginTop: '8px', display: 'inline-block' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.15)'}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
