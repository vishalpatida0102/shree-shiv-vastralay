import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../animations/ScrollReveal';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';

export default function RecentlyViewed() {
  const { recentItems } = useRecentlyViewed();

  if (recentItems.length === 0) return null;

  return (
    <section style={{ padding: '48px 0', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ padding: '0 16px' }}>
        <SectionHeading
          title="हाल में देखी गई"
          subtitle="जो साड़ियाँ आपने हाल में देखीं"
        />
      </div>

      <div
        id="recent-scroll"
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          padding: '4px 16px 16px',
          scrollSnapType: 'x mandatory',
        }}
      >
        <style>{`
          #recent-scroll::-webkit-scrollbar { height: 4px; }
          #recent-scroll::-webkit-scrollbar-track { background: transparent; }
          #recent-scroll::-webkit-scrollbar-thumb { background: linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%); border-radius: 10px; }
          #recent-scroll { scrollbar-width: thin; scrollbar-color: #D4AF37 transparent; }
        `}</style>
        {recentItems.map((item, i) => (
          <ScrollReveal key={item.id} delay={Math.min(i * 0.06, 0.3)}>
            <Link
              to={`/saree/${item.id}`}
              style={{
                scrollSnapAlign: 'start',
                display: 'block',
                textDecoration: 'none',
                minWidth: '140px',
                maxWidth: '160px',
              }}
            >
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  backgroundColor: '#f5f0eb',
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '8px 10px 10px' }}>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#2D2D2D',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.name}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#B8960C',
                    margin: '3px 0 0',
                  }}>
                    ₹{item.price.toLocaleString('hi-IN')}
                  </p>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
