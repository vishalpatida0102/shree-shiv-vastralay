import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Gem, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import PageTransition from '../components/animations/PageTransition';
import ScrollReveal from '../components/animations/ScrollReveal';
import StatsSection from '../components/home/StatsSection';
import { shopInfo } from '../data/dummyData';

const values = [
  {
    icon: Gem,
    color: '#D4AF37',
    bg: 'rgba(212,175,55,0.08)',
    title: 'गुणवत्ता',
    desc: 'हम सिर्फ सबसे बेहतरीन कपड़ों और शिल्प का चयन करते हैं। हर साड़ी गुणवत्ता की कसौटी पर खरी उतरती है।',
  },
  {
    icon: Shield,
    color: '#B8960C',
    bg: 'rgba(184,150,12,0.06)',
    title: 'परंपरा',
    desc: 'भारतीय बुनकरों की सदियों पुरानी कला और परंपरा को हम आगे बढ़ा रहे हैं। हर धागे में एक कहानी है।',
  },
  {
    icon: Heart,
    color: '#c62828',
    bg: 'rgba(198,40,40,0.06)',
    title: 'विश्वास',
    desc: 'तीन पीढ़ियों से हमारे ग्राहकों का विश्वास ही हमारी सबसे बड़ी पूंजी है। आपकी संतुष्टि हमारी प्राथमिकता।',
  },
];

export default function About() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <PageTransition>
      <SEO title="हमारे बारे में" description="नागपुर वाला — 39,000+ ग्राहकों का भरोसा। जानिए हमारी कहानी और हमारे मूल्य।" />
      <div style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>

        {/* ═══════ Hero Section ═══════ */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Background with logo */}
          <div style={{
            position: 'relative',
            height: '52vh',
            minHeight: '340px',
            background: 'linear-gradient(135deg, #1a1206 0%, #2D2D2D 50%, #1a1206 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '80px',
          }}>
            <div style={{
              width: '168px',
              height: '168px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
              padding: '4px',
              boxShadow: '0 0 60px rgba(212,175,55,0.3), 0 0 120px rgba(212,175,55,0.1)',
            }}>
              <img
                src="/logo.jpeg"
                alt="नागपुर वाला"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center 40%, transparent 30%, rgba(0,0,0,0.4) 100%)',
            }} />
          </div>

          {/* Hero content - overlapping bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0 20px 32px',
            textAlign: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
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
                  हमारी पहचान
                </span>
              </div>

              <h1
                className="font-heading"
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#fff',
                  margin: '0 0 10px 0',
                  lineHeight: '1.2',
                }}
              >
                हमारे बारे में
              </h1>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.7)',
                margin: 0,
                lineHeight: '1.6',
              }}>
                {shopInfo.tagline}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ═══════ Brand Story ═══════ */}
        <section style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '1.5px', backgroundColor: '#D4AF37' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  हमारी कहानी
                </span>
                <div style={{ width: '32px', height: '1.5px', backgroundColor: '#D4AF37' }} />
              </div>
              <h2
                className="font-heading"
                style={{ fontSize: '24px', fontWeight: '700', color: '#B8960C', margin: 0 }}
              >
                नागपुर वाला
              </h2>
            </div>

            <p style={{
              fontSize: '14px',
              color: '#555',
              lineHeight: '2',
              textAlign: 'center',
              margin: 0,
            }}>
              {shopInfo.story}
            </p>
          </ScrollReveal>
        </section>

        {/* ═══════ Values Section ═══════ */}
        <section style={{ padding: '0 16px 40px', maxWidth: '900px', margin: '0 auto' }}>
          <style>{`
            #values-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
            @media (min-width: 768px) { #values-grid { grid-template-columns: 1fr 1fr 1fr; gap: 20px; } }
          `}</style>
          <div id="values-grid">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={i * 0.12}>
                  <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '24px 20px',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                  }}>
                    {/* Icon circle */}
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: v.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={20} style={{ color: v.color }} />
                    </div>
                    {/* Text */}
                    <div>
                      <h3
                        className="font-heading"
                        style={{ fontSize: '16px', fontWeight: '700', color: '#2D2D2D', margin: '0 0 6px 0' }}
                      >
                        {v.title}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#777', lineHeight: '1.8', margin: 0 }}>
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ═══════ Quote / Parallax Section ═══════ */}
        <section style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', padding: '56px 20px' }}>
            {/* Background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(45,45,45,0.88), rgba(26,26,26,0.92))',
            }} />

            {/* Content */}
            <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <ScrollReveal>
                {/* Decorative quote mark */}
                <div style={{
                  fontSize: '60px',
                  fontFamily: 'Georgia, serif',
                  color: 'rgba(212,175,55,0.3)',
                  lineHeight: '1',
                  marginBottom: '-10px',
                }}>
                  "
                </div>
                <p
                  className="font-heading"
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#fff',
                    lineHeight: '1.8',
                    margin: '0 0 20px 0',
                  }}
                >
                  हर साड़ी एक कहानी कहती है — बुनकरों की कला, परंपरा की विरासत
                  और पहनने वाली की शान।
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '1.5px', backgroundColor: '#D4AF37' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#D4AF37' }}>
                    {shopInfo.name}
                  </span>
                  <div style={{ width: '24px', height: '1.5px', backgroundColor: '#D4AF37' }} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════ Stats ═══════ */}
        <StatsSection />

        {/* ═══════ Why Choose Us ═══════ */}
        <section style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '1.5px', backgroundColor: '#D4AF37' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  क्यों चुनें
                </span>
                <div style={{ width: '32px', height: '1.5px', backgroundColor: '#D4AF37' }} />
              </div>
              <h2
                className="font-heading"
                style={{ fontSize: '22px', fontWeight: '700', color: '#2D2D2D', margin: 0 }}
              >
                हमें क्यों चुनें?
              </h2>
            </div>
          </ScrollReveal>

          {/* Features list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { num: '01', title: 'प्रीमियम क्वालिटी', desc: 'हर साड़ी को सावधानीपूर्वक चुना जाता है और गुणवत्ता जांच के बाद ही आप तक पहुँचती है।' },
              { num: '02', title: 'सीधे बुनकरों से', desc: 'हम बनारस, पैठण और कांजीवरम के बुनकरों से सीधे साड़ियाँ लाते हैं — बिचौलिया नहीं।' },
              { num: '03', title: 'उचित दाम', desc: 'सीधी खरीदारी का फायदा — आपको मिलती है बेहतरीन साड़ी, उचित दाम में।' },
              { num: '04', title: 'पूरे भारत में डिलीवरी', desc: '25+ शहरों में सुरक्षित पैकिंग के साथ तेज़ डिलीवरी।' },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 0.1}>
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  backgroundColor: '#fff',
                  borderRadius: '14px',
                  padding: '18px 16px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  {/* Number */}
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #2D2D2D, #1a1a1a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{item.num}</span>
                  </div>
                  <div>
                    <h4
                      className="font-heading"
                      style={{ fontSize: '14px', fontWeight: '700', color: '#2D2D2D', margin: '0 0 4px 0' }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#777', lineHeight: '1.7', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══════ CTA Section ═══════ */}
        <section style={{
          margin: '0 16px 32px',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2D2D2D 50%, #1a1a1a 100%)',
            padding: '40px 24px',
            textAlign: 'center',
          }}>
            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '1px solid rgba(212,175,55,0.15)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '1px solid rgba(212,175,55,0.1)',
            }} />

            <ScrollReveal>
              <h2
                className="font-heading"
                style={{ fontSize: '22px', fontWeight: '700', color: '#fff', margin: '0 0 8px 0' }}
              >
                हमारा कलेक्शन देखें
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '0 0 24px 0', lineHeight: '1.6' }}>
                एक्सक्लूसिव साड़ियाँ जो कभी पुरानी नहीं होतीं
              </p>
              <Link
                to="/sarees"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: ctaHovered ? '#fff' : 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                  color: '#1a1a1a',
                  fontWeight: '600',
                  padding: '13px 28px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
              >
                साड़ियाँ देखें
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
