import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600',
    title: 'जहाँ परंपरा मिलती है फैशन से',
    subtitle: 'एक्सक्लूसिव साड़ियाँ और ब्राइडल कलेक्शन — नागपुर वाला',
  },
  {
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1600',
    title: 'ब्राइडल कलेक्शन',
    subtitle: 'दुल्हन के लिए विशेष साड़ियाँ — ऐसी शान जो कभी पुरानी न हो',
  },
  {
    image: 'https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=1600',
    title: 'एक्सक्लूसिव कलेक्शन',
    subtitle: 'हर अवसर के लिए खास साड़ियाँ, सिर्फ आपके लिए',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* Background Images with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <motion.img
            src={heroSlides[current].image}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 8, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            {/* Small label */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(212,175,55,0.15)',
              backdropFilter: 'blur(10px)',
              padding: '6px 16px',
              borderRadius: '20px',
              marginBottom: '16px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D4AF37' }} />
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#D4AF37', letterSpacing: '1px', textTransform: 'uppercase' }}>
                नागपुर वाला
              </span>
            </div>

            <h1
              className="font-heading"
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '12px',
                lineHeight: '1.2',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {heroSlides[current].title}
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '14px',
              maxWidth: '500px',
              margin: '0 auto 28px',
              lineHeight: '1.7',
            }}>
              {heroSlides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/sarees"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: btnHovered
                ? 'linear-gradient(135deg, #fff, #f5f0eb)'
                : 'linear-gradient(135deg, #D4AF37, #c49a20)',
              color: btnHovered ? '#800020' : '#2D2D2D',
              fontWeight: '700',
              padding: '14px 32px',
              borderRadius: '50px',
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: btnHovered
                ? '0 6px 24px rgba(255,255,255,0.25)'
                : '0 6px 24px rgba(212,175,55,0.35)',
              transform: btnHovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
              letterSpacing: '0.3px',
            }}
          >
            संग्रह देखें
            <ArrowRight
              size={18}
              style={{
                transition: 'transform 0.3s',
                transform: btnHovered ? 'translateX(4px)' : 'translateX(0)',
              }}
            />
          </Link>
        </motion.div>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                height: i === current ? '4px' : '4px',
                width: i === current ? '28px' : '12px',
                borderRadius: '4px',
                backgroundColor: i === current ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade for seamless transition to next section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(to top, #FAF7F2, transparent)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
