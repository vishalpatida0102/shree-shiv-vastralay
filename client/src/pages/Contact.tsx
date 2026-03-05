import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Clock, Send, ExternalLink } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import ScrollReveal from '../components/animations/ScrollReveal';
import { shopInfo } from '../data/dummyData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [focusedField, setFocusedField] = useState('');
  const [submitHover, setSubmitHover] = useState(false);

  const whatsappUrl = `https://wa.me/${shopInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent('नमस्ते! मुझे साड़ी के बारे में जानकारी चाहिए।')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `नमस्ते! मेरा नाम ${form.name} है।\nफ़ोन: ${form.phone}\n\n${form.message}`;
    window.open(
      `https://wa.me/${shopInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '13px 14px',
    border: focusedField === field ? '1.5px solid #800020' : '1.5px solid #eee',
    borderRadius: '12px',
    fontSize: '13px',
    outline: 'none',
    backgroundColor: focusedField === field ? '#fff' : '#fafafa',
    transition: 'all 0.2s',
    color: '#2D2D2D',
    boxSizing: 'border-box' as const,
  });

  return (
    <PageTransition>
      <div style={{ paddingTop: '76px', paddingBottom: '100px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>

          {/* ═══════ Page Header ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '28px', paddingTop: '8px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '28px', height: '2px', backgroundColor: '#D4AF37' }} />
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                संपर्क
              </span>
              <div style={{ width: '28px', height: '2px', backgroundColor: '#D4AF37' }} />
            </div>
            <h1
              className="font-heading"
              style={{ fontSize: '26px', fontWeight: '700', color: '#2D2D2D', margin: '0 0 6px 0' }}
            >
              संपर्क करें
            </h1>
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>
              हमसे जुड़ें, हम आपकी मदद के लिए तैयार हैं
            </p>
          </motion.div>

          {/* ═══════ Quick Action Buttons ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
          >
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#25D366',
                color: '#fff',
                fontWeight: '600',
                padding: '14px 10px',
                borderRadius: '14px',
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37,211,102,0.25)',
              }}
            >
              <MessageCircle size={18} fill="white" />
              WhatsApp
            </a>

            {/* Call */}
            <a
              href={`tel:${shopInfo.phone}`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#800020',
                color: '#fff',
                fontWeight: '600',
                padding: '14px 10px',
                borderRadius: '14px',
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(128,0,32,0.2)',
              }}
            >
              <Phone size={18} />
              कॉल करें
            </a>

            {/* Instagram */}
            <a
              href={shopInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)',
                color: '#fff',
                fontWeight: '600',
                padding: '14px 10px',
                borderRadius: '14px',
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(225,48,108,0.25)',
              }}
            >
              <Instagram size={18} />
              Instagram
            </a>
          </motion.div>

          {/* ═══════ Contact Info Card ═══════ */}
          <ScrollReveal>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              marginBottom: '16px',
            }}>
              <h3
                className="font-heading"
                style={{ fontSize: '16px', fontWeight: '700', color: '#2D2D2D', margin: '0 0 16px 0' }}
              >
                दुकान की जानकारी
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Address */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(128,0,32,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <MapPin size={18} style={{ color: '#800020' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px 0' }}>पता</p>
                    <p style={{ fontSize: '13px', color: '#444', margin: 0, lineHeight: '1.6' }}>{shopInfo.address}</p>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: '#f5f5f5' }} />

                {/* Phone */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(128,0,32,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Phone size={18} style={{ color: '#800020' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px 0' }}>फ़ोन</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <a href={`tel:${shopInfo.phone}`} style={{ fontSize: '13px', color: '#800020', textDecoration: 'none', fontWeight: '500' }}>
                        7999665102
                      </a>
                      <span style={{ color: '#ddd' }}>|</span>
                      <a href={`tel:${shopInfo.phone2}`} style={{ fontSize: '13px', color: '#800020', textDecoration: 'none', fontWeight: '500' }}>
                        9752873734
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: '#f5f5f5' }} />

                {/* Email */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(128,0,32,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Mail size={18} style={{ color: '#800020' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px 0' }}>ईमेल</p>
                    <a href={`mailto:${shopInfo.email}`} style={{ fontSize: '13px', color: '#800020', textDecoration: 'none', fontWeight: '500' }}>
                      {shopInfo.email}
                    </a>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: '#f5f5f5' }} />

                {/* Timing */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(128,0,32,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Clock size={18} style={{ color: '#800020' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px 0' }}>समय</p>
                    <p style={{ fontSize: '13px', color: '#444', margin: '0 0 2px 0' }}>
                      सोम - शनि: <strong style={{ color: '#2D2D2D' }}>सुबह 10:00 - रात 9:00</strong>
                    </p>
                    <p style={{ fontSize: '13px', color: '#444', margin: 0 }}>
                      रविवार: <strong style={{ color: '#2D2D2D' }}>सुबह 11:00 - शाम 6:00</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ═══════ Map Section ═══════ */}
          <ScrollReveal delay={0.1}>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              marginBottom: '16px',
              backgroundColor: '#fff',
            }}>
              <div style={{ height: '220px' }}>
                <iframe
                  src={shopInfo.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="दुकान का नक्शा"
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#800020',
                  textDecoration: 'none',
                  borderTop: '1px solid #f5f5f5',
                }}
              >
                <ExternalLink size={14} />
                Google Maps में खोलें
              </a>
            </div>
          </ScrollReveal>

          {/* ═══════ Contact Form ═══════ */}
          <ScrollReveal delay={0.15}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '24px 20px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h3
                  className="font-heading"
                  style={{ fontSize: '18px', fontWeight: '700', color: '#2D2D2D', margin: '0 0 4px 0' }}
                >
                  हमें संदेश भेजें
                </h3>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                  फ़ॉर्म भरें, आपका संदेश WhatsApp पर भेजा जाएगा
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                      आपका नाम
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      placeholder="अपना नाम लिखें"
                      style={inputStyle('name')}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                      फ़ोन नंबर
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      placeholder="अपना फ़ोन नंबर लिखें"
                      style={inputStyle('phone')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                      संदेश
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      placeholder="आप क्या जानना चाहते हैं?"
                      style={{
                        ...inputStyle('message'),
                        resize: 'none' as const,
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    onMouseEnter={() => setSubmitHover(true)}
                    onMouseLeave={() => setSubmitHover(false)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: submitHover ? '#600018' : '#800020',
                      color: '#fff',
                      fontWeight: '600',
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 14px rgba(128,0,32,0.2)',
                      transform: submitHover ? 'translateY(-1px)' : 'translateY(0)',
                      marginTop: '4px',
                    }}
                  >
                    <Send size={16} />
                    WhatsApp पर भेजें
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </PageTransition>
  );
}
