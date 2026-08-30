import { motion } from 'framer-motion';
import { MapPin, Phone, AlertCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../animations/ScrollReveal';
import { useConfig } from '../../context/ConfigContext';
import { getIcon } from '../../config/icons';

export default function DeliveryInfo() {
  const { config, whatsappLink } = useConfig();
  const { highlights, steps, requiredFields, notes, ctaText } = config.delivery;
  const whatsappUrl = whatsappLink(config.whatsappMessages.order);

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
            const Icon = getIcon(item.icon);
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
                  key={step.title}
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
                    <span className="font-heading" style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>{i + 1}</span>
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
                {requiredFields.map((tag) => (
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
              {notes.map((note) => (
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
              {ctaText}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
