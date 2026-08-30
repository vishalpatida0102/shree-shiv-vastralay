import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';

export default function Hero() {
  const { hero, identity } = useSiteConfig();
  const heroSlides = hero.slides;
  const [current, setCurrent] = useState(0);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // एडमिन ने स्लाइड घटाई हों तो index रेंज से बाहर न जाए
  const slide = heroSlides[current] || heroSlides[0];
  if (!slide) return null;

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
          style={{
            position: 'absolute',
            inset: 0,
            background: slide.isLogo
              ? 'linear-gradient(135deg, #1a1206 0%, #2D2D2D 50%, #1a1206 100%)'
              : undefined,
          }}
        >
          {slide.isLogo ? (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '120px',
            }}>
              <motion.div
                style={{
                  width: '188px',
                  height: '188px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                  padding: '4px',
                  boxShadow: '0 0 60px rgba(212,175,55,0.3), 0 0 120px rgba(212,175,55,0.1)',
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={identity.logo}
                  alt={identity.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </motion.div>
            </div>
          ) : (
            <motion.img
              src={slide.image}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              animate={{ scale: [1, 1.08] }}
              transition={{ duration: 8, ease: 'linear' }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: slide.isLogo
          ? 'radial-gradient(circle at center 40%, transparent 30%, rgba(0,0,0,0.4) 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'center',
        padding: '0 20px 180px',
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
              {slide.title}
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '14px',
              maxWidth: '500px',
              margin: '0 auto 28px',
              lineHeight: '1.7',
            }}>
              {slide.subtitle}
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
            to={hero.ctaLink}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: btnHovered
                ? 'linear-gradient(135deg, #fff, #f5f0eb)'
                : 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
              color: btnHovered ? '#2D2D2D' : '#2D2D2D',
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
            {hero.ctaText}
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
