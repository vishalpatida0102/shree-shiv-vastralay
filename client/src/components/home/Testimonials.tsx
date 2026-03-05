import { Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../animations/ScrollReveal';
import { testimonials } from '../../data/dummyData';

export default function Testimonials() {
  return (
    <section style={{ padding: '48px 16px', maxWidth: '1200px', margin: '0 auto' }}>
      <SectionHeading
        title="हमारे ग्राहक"
        subtitle="जानिए हमारे ग्राहकों का अनुभव"
      />

      <style>{`
        #testimonials-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (min-width: 768px) { #testimonials-grid { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px; } }
      `}</style>
      <div id="testimonials-grid">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.id} delay={i * 0.1}>
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <img
                  src={t.image}
                  alt={t.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div>
                  <h4 style={{ fontWeight: '600', color: '#2D2D2D', fontSize: '13px' }}>
                    {t.name}
                  </h4>
                  <p style={{ color: '#4a4a4a', fontSize: '11px' }}>{t.location}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    style={{ color: '#D4AF37', fill: '#D4AF37' }}
                  />
                ))}
              </div>
              <p style={{ color: '#4a4a4a', fontSize: '12px', lineHeight: '1.7' }}>
                "{t.text}"
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
