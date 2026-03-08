import { useState, useEffect } from 'react';
import SectionHeading from '../ui/SectionHeading';
import SareeCard from '../catalog/SareeCard';
import StaggerChildren from '../animations/StaggerChildren';
import { productsApi } from '../../services/api';
import { toSaree } from '../../services/helpers';
import type { Saree } from '../../types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function FeaturedSarees() {
  const [featured, setFeatured] = useState<Saree[]>([]);

  useEffect(() => {
    productsApi.getAll({ featured: 'true' })
      .then((prods) => setFeatured(prods.map(toSaree).slice(0, 6)))
      .catch(() => {});
  }, []);

  if (featured.length === 0) return null;

  return (
    <section style={{ padding: '48px 16px', maxWidth: '1200px', margin: '0 auto' }}>
      <SectionHeading
        title="विशेष संग्रह"
        subtitle="हमारी सबसे लोकप्रिय और चुनिंदा साड़ियाँ"
      />

      <StaggerChildren className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '12px' }}>
        {featured.map((saree) => (
          <SareeCard key={saree.id} saree={saree} />
        ))}
      </StaggerChildren>

      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <Link
          to="/sarees"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
            color: '#1a1a1a',
            fontWeight: '600',
            padding: '12px 28px',
            borderRadius: '50px',
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}
        >
          सभी साड़ियाँ देखें
          <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  );
}
