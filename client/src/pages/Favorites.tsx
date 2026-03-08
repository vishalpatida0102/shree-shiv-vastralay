import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import PageTransition from '../components/animations/PageTransition';
import ScrollReveal from '../components/animations/ScrollReveal';
import StaggerChildren from '../components/animations/StaggerChildren';
import SareeCard from '../components/catalog/SareeCard';
import { useFavorites } from '../hooks/useFavorites';
import { productsApi } from '../services/api';
import { toSaree } from '../services/helpers';
import type { Saree } from '../types';

export default function Favorites() {
  const { favorites } = useFavorites();
  const [favSarees, setFavSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavSarees([]);
      setLoading(false);
      return;
    }

    productsApi.getAll().then((products) => {
      const mapped = products.map(toSaree);
      setFavSarees(mapped.filter((s) => favorites.includes(s.id)));
    }).catch(() => {
      setFavSarees([]);
    }).finally(() => setLoading(false));
  }, [favorites]);

  return (
    <PageTransition>
      <SEO title="पसंदीदा साड़ियाँ" description="आपकी पसंदीदा साड़ियाँ एक जगह।" />
      <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
        {/* Header */}
        <div style={{
          paddingTop: '80px',
          paddingBottom: '24px',
          paddingLeft: '16px',
          paddingRight: '16px',
          background: 'linear-gradient(180deg, #fff 0%, #FAF7F2 100%)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Back link */}
            <Link
              to="/sarees"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: '#999',
                textDecoration: 'none',
                marginBottom: '16px',
              }}
            >
              <ArrowLeft size={16} />
              साड़ियाँ पर वापस जाएँ
            </Link>

            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Heart size={18} style={{ color: '#fff', fill: '#fff' }} />
                </div>
                <div>
                  <span
                    className="font-heading"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                      color: '#1a1a1a',
                      fontSize: '14px',
                      fontWeight: '700',
                      padding: '8px 22px',
                      borderRadius: '50px',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 8px rgba(184,150,12,0.25)',
                    }}
                  >
                    पसंदीदा साड़ियाँ
                  </span>
                  <p style={{ fontSize: '13px', color: '#999', margin: '2px 0 0' }}>
                    {favSarees.length > 0
                      ? `${favSarees.length} साड़ियाँ आपकी पसंद में`
                      : loading ? 'लोड हो रहा है...' : 'अभी कोई पसंदीदा नहीं'}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '0 16px 120px', maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999', fontSize: '14px' }}>
              लोड हो रहा है...
            </div>
          ) : favSarees.length > 0 ? (
            <StaggerChildren>
              <style>{`
                #fav-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
                @media (min-width: 768px) { #fav-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
                @media (min-width: 1024px) { #fav-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
              `}</style>
              <div id="fav-grid">
                {favSarees.map((saree) => (
                  <SareeCard key={saree.id} saree={saree} />
                ))}
              </div>
            </StaggerChildren>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                textAlign: 'center',
                padding: '60px 20px',
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(184,150,12,0.08), rgba(184,150,12,0.04))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Heart size={32} style={{ color: '#B8960C', opacity: 0.4 }} />
              </div>

              <h2 className="font-heading" style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2D2D2D',
                margin: '0 0 8px',
              }}>
                अभी कोई पसंदीदा नहीं
              </h2>

              <p style={{
                fontSize: '14px',
                color: '#999',
                lineHeight: '1.6',
                maxWidth: '280px',
                margin: '0 auto 24px',
              }}>
                साड़ियों पर दिल का बटन दबाकर अपनी पसंदीदा साड़ियाँ यहाँ सेव करें
              </p>

              <Link
                to="/sarees"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                  color: '#fff',
                  padding: '12px 28px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(184,150,12,0.25)',
                }}
              >
                <ShoppingBag size={16} />
                साड़ियाँ देखें
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
