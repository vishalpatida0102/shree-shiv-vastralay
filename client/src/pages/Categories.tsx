import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import SEO from '../components/ui/SEO';
import PageTransition from '../components/animations/PageTransition';
import { productsApi, categoriesApi } from '../services/api';
import { toSaree, toCategory } from '../services/helpers';
import type { Category, Saree } from '../types';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

function CategoryCard({ cat, index, sareeCount, isLarge = false }: { cat: Category; index: number; sareeCount: number; isLarge?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Link
        to={`/sarees?category=${cat.id}`}
        style={{ display: 'block', textDecoration: 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: isLarge ? '16/10' : '3/4',
          boxShadow: hovered
            ? '0 12px 32px rgba(184,150,12,0.18)'
            : '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}>
          <img
            src={cat.image}
            alt={cat.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isLarge
              ? 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.05) 100%)',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(184,150,12,0.15)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }} />
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '5px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Sparkles size={11} style={{ color: '#D4AF37' }} />
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#fff' }}>
              {sareeCount} साड़ियाँ
            </span>
          </div>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: isLarge ? '24px' : '16px',
          }}>
            <h3
              className="font-heading"
              style={{
                fontSize: isLarge ? '22px' : '16px',
                fontWeight: '700',
                color: '#fff',
                margin: '0 0 4px 0',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              {cat.name}
            </h3>
            <p style={{
              fontSize: isLarge ? '13px' : '11px',
              color: 'rgba(255,255,255,0.75)',
              margin: '0 0 10px 0',
              lineHeight: '1.5',
              ...(isLarge ? {} : {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
              }),
            }}>
              {cat.description}
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: hovered ? '#D4AF37' : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              padding: isLarge ? '8px 16px' : '6px 12px',
              borderRadius: '20px',
              transition: 'all 0.3s',
            }}>
              <span style={{
                fontSize: isLarge ? '12px' : '11px',
                fontWeight: '600',
                color: hovered ? '#2D2D2D' : '#fff',
                transition: 'color 0.3s',
              }}>
                कलेक्शन देखें
              </span>
              <ArrowRight
                size={isLarge ? 14 : 12}
                style={{
                  color: hovered ? '#2D2D2D' : '#fff',
                  transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                  transition: 'all 0.3s',
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([categoriesApi.getAll(), productsApi.getAll()])
      .then(([cats, prods]) => {
        setCategories(cats.map(toCategory));
        setSarees(prods.map(toSaree));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <PageTransition>
        <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 size={28} style={{ color: '#B8960C', animation: 'spin 1s linear infinite' }} />
        </div>
      </PageTransition>
    );
  }

  const heroCategory = categories[0];
  const restCategories = categories.slice(1);

  const getSareeCount = (catId: string) => sarees.filter(s => s.category === catId).length;

  return (
    <PageTransition>
      <SEO title="श्रेणियाँ" description="सिल्क, बनारसी, पैठणी, कॉटन और डिज़ाइनर — सभी श्रेणियों की साड़ियाँ देखें।" />
      <div style={{ paddingTop: '76px', paddingBottom: '100px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '28px', paddingTop: '16px' }}
          >
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
              श्रेणियाँ
            </span>
            <p style={{ fontSize: '13px', color: '#888', margin: '14px 0 0', lineHeight: '1.6' }}>
              अपनी पसंद की श्रेणी चुनें और एक्सक्लूसिव साड़ियाँ खोजें
            </p>
          </motion.div>

          {/* Hero Category */}
          {heroCategory && (
            <div style={{ marginBottom: '16px' }}>
              <CategoryCard cat={heroCategory} index={0} sareeCount={getSareeCount(heroCategory.id)} isLarge />
            </div>
          )}

          {/* Rest Categories */}
          <style>{`
            #categories-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            @media (min-width: 768px) { #categories-grid { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; } }
          `}</style>
          <div id="categories-grid">
            {restCategories.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i + 1} sareeCount={getSareeCount(cat.id)} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              marginTop: '32px',
              textAlign: 'center',
              padding: '28px 20px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
            }}
          >
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '14px' }}>
              सभी श्रेणियों में कुल <strong style={{ color: '#B8960C' }}>{sarees.length}+</strong> साड़ियाँ उपलब्ध हैं
            </p>
            <Link
              to="/sarees"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                color: '#1a1a1a',
                fontWeight: '600',
                padding: '12px 28px',
                borderRadius: '50px',
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(184,150,12,0.25)',
              }}
            >
              सभी साड़ियाँ देखें
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
