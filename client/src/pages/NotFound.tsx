import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/ui/SEO';
import PageTransition from '../components/animations/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <SEO title="पेज नहीं मिला" />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#FAF7F2',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: '400px' }}
        >
          {/* Big 404 */}
          <div style={{
            fontSize: '120px',
            fontWeight: '800',
            background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1',
            marginBottom: '16px',
          }}>
            404
          </div>

          <h1
            className="font-heading"
            style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#2D2D2D',
              margin: '0 0 10px',
            }}
          >
            पेज नहीं मिला
          </h1>

          <p style={{
            fontSize: '14px',
            color: '#888',
            lineHeight: '1.7',
            margin: '0 0 32px',
          }}>
            जो पेज आप ढूंढ रहे हैं वो मौजूद नहीं है या हटा दिया गया है।
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                color: '#1a1a1a',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(184,150,12,0.2)',
              }}
            >
              <Home size={16} />
              होम पर जाएँ
            </Link>
            <Link
              to="/sarees"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#fff',
                color: '#B8960C',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                textDecoration: 'none',
                border: '1.5px solid #B8960C',
              }}
            >
              <ArrowLeft size={16} />
              साड़ियाँ देखें
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
