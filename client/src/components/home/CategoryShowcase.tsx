import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import StaggerChildren, { staggerItem } from '../animations/StaggerChildren';
import { categoriesApi } from '../../services/api';
import { toCategory } from '../../services/helpers';
import type { Category } from '../../types';

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoriesApi.getAll()
      .then((cats) => setCategories(cats.map(toCategory)))
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <section style={{ padding: '48px 16px', maxWidth: '1200px', margin: '0 auto' }}>
      <SectionHeading
        title="श्रेणियाँ"
        subtitle="अपनी पसंद की साड़ी खोजें"
      />

      <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ gap: '12px' }}>
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={staggerItem}>
            <Link
              to={`/sarees?category=${cat.id}`}
              style={{ display: 'block', position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '3/4' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                loading="lazy"
              />
              <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '14px' }}>
                <h3 className="font-heading" style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                  {cat.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '3px' }}>
                  {cat.count} साड़ियाँ
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </StaggerChildren>
    </section>
  );
}
