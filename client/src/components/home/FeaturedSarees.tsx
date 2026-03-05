import SectionHeading from '../ui/SectionHeading';
import SareeCard from '../catalog/SareeCard';
import StaggerChildren from '../animations/StaggerChildren';
import { sarees } from '../../data/dummyData';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function FeaturedSarees() {
  const featured = sarees.filter((s) => s.isFeatured).slice(0, 6);

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
            border: '2px solid #800020',
            color: '#800020',
            fontWeight: '600',
            padding: '12px 28px',
            borderRadius: '50px',
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#800020';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#800020';
          }}
        >
          सभी साड़ियाँ देखें
          <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  );
}
