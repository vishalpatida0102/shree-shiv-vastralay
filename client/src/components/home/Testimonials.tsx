import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../animations/ScrollReveal';
import { reviewsApi } from '../../services/api';
import type { ApiReview } from '../../services/api';
import { testimonials } from '../../data/dummyData';

interface CardItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
}

export default function Testimonials() {
  const [approvedReviews, setApprovedReviews] = useState<ApiReview[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reviewsApi.getApproved()
      .then(setApprovedReviews)
      .catch(() => {});
  }, []);

  // Convert approved reviews to same shape as testimonials
  const reviewCards: CardItem[] = approvedReviews.map((r) => ({
    id: `r-${r._id}`,
    name: r.name,
    location: r.location,
    rating: r.rating,
    text: r.message,
  }));

  // Dummy testimonials as fallback
  const dummyCards: CardItem[] = testimonials.map((t) => ({
    id: t.id,
    name: t.name,
    location: t.location,
    rating: t.rating,
    text: t.text,
    image: t.image,
  }));

  // Mix: approved reviews first, then dummy
  const allCards = [...reviewCards, ...dummyCards];

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '48px 0', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ padding: '0 16px' }}>
        <SectionHeading
          title="हमारे ग्राहक"
          subtitle="जानिए हमारे ग्राहकों का अनुभव"
        />
      </div>

      <div style={{ position: 'relative' }}>
        <style>{`
          #testi-arrow-l, #testi-arrow-r { display: none; }
          @media (min-width: 768px) { #testi-arrow-l, #testi-arrow-r { display: flex; } }
          #testi-scroll::-webkit-scrollbar { display: none; }
          #testi-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <div
          id="testi-arrow-l"
          onClick={() => scroll('left')}
          style={{
            position: 'absolute', left: '4px', top: '50%', transform: 'translateY(-50%)', zIndex: 5,
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronLeft size={18} style={{ color: '#B8960C' }} />
        </div>
        <div
          id="testi-arrow-r"
          onClick={() => scroll('right')}
          style={{
            position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', zIndex: 5,
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronRight size={18} style={{ color: '#B8960C' }} />
        </div>

        <div
          id="testi-scroll"
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '4px 16px 16px',
          }}
        >
          {allCards.map((t, i) => (
            <ScrollReveal key={t.id} delay={Math.min(i * 0.08, 0.4)}>
              <div style={{
                scrollSnapAlign: 'start',
                minWidth: '260px',
                maxWidth: '280px',
                height: '190px',
                backgroundColor: '#fff',
                borderRadius: '14px',
                padding: '18px',
                boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ fontWeight: '600', color: '#2D2D2D', fontSize: '13px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.name}
                    </h4>
                    <p style={{ color: '#999', fontSize: '11px', margin: '2px 0 0' }}>{t.location}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={13}
                      style={{
                        color: t.rating >= s ? '#D4AF37' : '#e0e0e0',
                        fill: t.rating >= s ? '#D4AF37' : 'none',
                      }}
                    />
                  ))}
                </div>

                <p style={{
                  color: '#555',
                  fontSize: '12px',
                  lineHeight: '1.7',
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  "{t.text}"
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '6px',
          paddingTop: '8px',
        }}>
          <div style={{ width: '20px', height: '3px', borderRadius: '2px', backgroundColor: '#B8960C' }} />
          <div style={{ width: '20px', height: '3px', borderRadius: '2px', backgroundColor: '#e0d8cf' }} />
          <div style={{ width: '20px', height: '3px', borderRadius: '2px', backgroundColor: '#e0d8cf' }} />
        </div>
      </div>
    </section>
  );
}
