import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { shopInfo } from '../../data/dummyData';

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
}

function Counter({ end, suffix = '', label }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center' }}
    >
      <div className="font-heading" style={{ fontSize: '28px', fontWeight: '700', color: '#D4AF37' }}>
        {count.toLocaleString('hi-IN')}
        {suffix}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '6px' }}>{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const stats = [
    { end: shopInfo.stats.followers, suffix: '+', label: 'Instagram फॉलोअर्स' },
    { end: shopInfo.stats.customers, suffix: '+', label: 'खुश ग्राहक' },
    { end: shopInfo.stats.sarees, suffix: '+', label: 'साड़ियों का संग्रह' },
    { end: shopInfo.stats.cities, suffix: '+', label: 'शहरों में डिलीवरी' },
  ];

  return (
    <section style={{ backgroundColor: '#2D2D2D', padding: '48px 16px' }}>
      <style>{`
        #stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 16px; max-width: '900px'; margin: 0 auto; }
        @media (min-width: 768px) { #stats-grid { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; } }
      `}</style>
      <div id="stats-grid">
        {stats.map((s) => (
          <Counter key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
