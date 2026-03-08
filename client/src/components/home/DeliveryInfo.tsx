import { motion } from 'framer-motion';
import { Truck, CreditCard, Clock, Package, MapPin, Phone, AlertCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../animations/ScrollReveal';
import { shopInfo } from '../../data/dummyData';

const highlights = [
  { icon: Truck, title: '₹80 प्रति साड़ी', desc: 'पूरे भारत में डिलीवरी', color: '#D4AF37' },
  { icon: Clock, title: '7 कार्य दिवस', desc: 'में डिलीवरी हो जाएगी', color: '#1565c0' },
  { icon: CreditCard, title: 'ऑनलाइन पेमेंट', desc: 'सिर्फ प्रीपेड ऑर्डर', color: '#2e7d32' },
  { icon: Package, title: '1 साड़ी से ऑर्डर', desc: 'कोई मिनिमम ऑर्डर नहीं', color: '#7b1fa2' },
];

const steps = [
  { num: '1', title: 'साड़ी चुनें', desc: 'वेबसाइट पर पसंदीदा साड़ी देखें' },
  { num: '2', title: 'WhatsApp पर बताएँ', desc: 'नाम, नंबर, पता, पिनकोड दें' },
  { num: '3', title: 'पेमेंट करें', desc: 'ऑनलाइन पेमेंट करें' },
  { num: '4', title: 'डिलीवरी पाएँ', desc: '7 कार्य दिवस में घर पहुँचे' },
];

export default function DeliveryInfo() {
  const whatsappUrl = `https://wa.me/${shopInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent('नमस्ते! मुझे साड़ी ऑर्डर करनी है।')}`;

  return (
    <section style={{ padding: '48px 0', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ padding: '0 16px' }}>
        <SectionHeading title="डिलीवरी जानकारी" subtitle="ऑर्डर करना आसान है — बस 4 स्टेप्स में अपनी साड़ी घर मँगाएँ" />

        {/* Highlights Grid */}
        <style>{`
          #delivery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
          @media (min-width: 768px) { #delivery-grid { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; } }
        `}</style>
        <div id="delivery-grid">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: `${item.color}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}>
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-heading" style={{ fontSize: '15px', fontWeight: '700', color: '#2D2D2D', margin: '0 0 4px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '11px', color: '#888', margin: 0, lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Order Steps */}
        <ScrollReveal delay={0.2}>
          <div style={{
            marginTop: '28px',
            background: 'linear-gradient(135deg, #2D2D2D 0%, #3a3a3a 100%)',
            borderRadius: '20px',
            padding: '28px 20px',
          }}>
            <h3 className="font-heading" style={{ fontSize: '16px', fontWeight: '700', color: '#D4AF37', margin: '0 0 20px', textAlign: 'center' }}>
              ऑर्डर कैसे करें?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span className="font-heading" style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>{step.num}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff', margin: '0 0 2px' }}>{step.title}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What customer needs to provide */}
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <MapPin size={14} style={{ color: '#D4AF37' }} />
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#D4AF37', margin: 0 }}>ऑर्डर के लिए यह जानकारी दें:</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['पूरा नाम', 'मोबाइल नंबर', 'पूरा पता', 'पिनकोड'].map((tag) => (
                  <span key={tag} style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    color: 'rgba(255,255,255,0.8)',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div style={{
              marginTop: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              {[
                'Cash on Delivery उपलब्ध नहीं है',
                'कोई एक्सचेंज या रिटर्न नहीं',
              ].map((note) => (
                <div key={note} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={12} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{note}</p>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                backgroundColor: '#25D366',
                color: '#fff',
                fontWeight: '700',
                padding: '14px',
                borderRadius: '14px',
                fontSize: '14px',
                textDecoration: 'none',
                marginTop: '20px',
                boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
              }}
            >
              <Phone size={18} />
              अभी ऑर्डर करें — WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
