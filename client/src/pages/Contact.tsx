import { useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Clock, Send, ExternalLink, Star, CheckCircle } from 'lucide-react';
import SEO from '../components/ui/SEO';
import PageTransition from '../components/animations/PageTransition';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useConfig } from '../context/ConfigContext';
import { displayPhone } from '../config/siteConfig';
import { reviewsApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const { showToast } = useToast();
  const { config, whatsappLink } = useConfig();
  const { contact, social } = config;
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [focusedField, setFocusedField] = useState('');
  const [submitHover, setSubmitHover] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', location: '', rating: 5, message: '' });
  const [reviewHover, setReviewHover] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const whatsappUrl = whatsappLink(config.whatsappMessages.general);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `नमस्ते! मेरा नाम ${form.name} है।\nफ़ोन: ${form.phone}\n\n${form.message}`;
    window.open(whatsappLink(msg), '_blank');
    showToast('WhatsApp पर संदेश भेजा जा रहा है!');
    setForm({ name: '', phone: '', message: '' });
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '13px 14px',
    border: focusedField === field ? '1.5px solid #B8960C' : '1.5px solid #eee',
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
      <SEO title="संपर्क करें" description="नागपुर वाला से संपर्क करें। WhatsApp, फ़ोन या ईमेल — हम आपकी मदद के लिए तैयार हैं।" />
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
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>

            {/* Call */}
            <a
              href={`tel:${contact.phone}`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                color: '#1a1a1a',
                fontWeight: '600',
                padding: '14px 10px',
                borderRadius: '14px',
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(184,150,12,0.2)',
              }}
            >
              <Phone size={18} />
              कॉल करें
            </a>

            {/* Instagram */}
            <a
              href={social.instagram}
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
                    backgroundColor: 'rgba(184,150,12,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <MapPin size={18} style={{ color: '#B8960C' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px 0' }}>पता</p>
                    <p style={{ fontSize: '13px', color: '#444', margin: 0, lineHeight: '1.6' }}>{contact.address}</p>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: '#f5f5f5' }} />

                {/* Phone */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(184,150,12,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Phone size={18} style={{ color: '#B8960C' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px 0' }}>फ़ोन</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {[contact.phone, contact.phone2].filter(Boolean).map((num, i) => (
                        <Fragment key={num}>
                          {i > 0 && <span style={{ color: '#ddd' }}>|</span>}
                          <a href={`tel:${num}`} style={{ fontSize: '13px', color: '#B8960C', textDecoration: 'none', fontWeight: '500' }}>
                            {displayPhone(num)}
                          </a>
                        </Fragment>
                      ))}
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
                    backgroundColor: 'rgba(184,150,12,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Mail size={18} style={{ color: '#B8960C' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px 0' }}>ईमेल</p>
                    <a href={`mailto:${contact.email}`} style={{ fontSize: '13px', color: '#B8960C', textDecoration: 'none', fontWeight: '500' }}>
                      {contact.email}
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
                    backgroundColor: 'rgba(184,150,12,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Clock size={18} style={{ color: '#B8960C' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px 0' }}>समय</p>
                    {contact.timings.map((t, i) => (
                      <p key={t.label} style={{ fontSize: '13px', color: '#444', margin: i === contact.timings.length - 1 ? 0 : '0 0 2px 0' }}>
                        {t.label}: <strong style={{ color: '#2D2D2D' }}>{t.hours}</strong>
                      </p>
                    ))}
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
                  src={contact.mapUrl}
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
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
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
                  color: '#B8960C',
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
                      background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                      color: '#1a1a1a',
                      fontWeight: '600',
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 14px rgba(184,150,12,0.2)',
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

          {/* ═══════ Feedback / Review Form ═══════ */}
          <ScrollReveal delay={0.2}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '24px 20px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              marginTop: '16px',
            }}>
              {reviewSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '32px 16px' }}
                >
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(5,150,105,0.1), rgba(5,150,105,0.05))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 14px',
                  }}>
                    <CheckCircle size={28} style={{ color: '#059669' }} />
                  </div>
                  <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: '700', color: '#2D2D2D', margin: '0 0 6px' }}>
                    धन्यवाद!
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', margin: '0 0 16px' }}>
                    आपका फीडबैक सफलतापूर्वक जमा हो गया है। एडमिन अप्रूव करने के बाद यह दिखाई देगा।
                  </p>
                  <button
                    onClick={() => {
                      setReviewSubmitted(false);
                      setReviewForm({ name: '', location: '', rating: 5, message: '' });
                    }}
                    style={{
                      fontSize: '13px', fontWeight: '600', color: '#B8960C',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    एक और फीडबैक दें
                  </button>
                </motion.div>
              ) : (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '10px',
                        background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Star size={16} style={{ color: '#fff', fill: '#fff' }} />
                      </div>
                      <div>
                        <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: '700', color: '#2D2D2D', margin: 0 }}>
                          अपना फीडबैक दें
                        </h3>
                      </div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#999', margin: '6px 0 0' }}>
                      आपकी राय हमारे लिए बहुत महत्वपूर्ण है
                    </p>
                  </div>

                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setReviewSaving(true);
                    setReviewError('');
                    try {
                      await reviewsApi.create(reviewForm);
                      setReviewSubmitted(true);
                      showToast('आपकी समीक्षा सफलतापूर्वक भेजी गई!');
                    } catch (err: any) {
                      setReviewError(err.message || 'Failed to submit review');
                      showToast('समीक्षा भेजने में विफल', 'error');
                    } finally {
                      setReviewSaving(false);
                    }
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {/* Name */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                          आपका नाम
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewForm.name}
                          onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                          onFocus={() => setFocusedField('rname')}
                          onBlur={() => setFocusedField('')}
                          placeholder="अपना नाम लिखें"
                          style={inputStyle('rname')}
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                          शहर
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewForm.location}
                          onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                          onFocus={() => setFocusedField('rloc')}
                          onBlur={() => setFocusedField('')}
                          placeholder="जैसे: नागपुर, इंदौर"
                          style={inputStyle('rloc')}
                        />
                      </div>

                      {/* Star Rating */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '8px' }}>
                          रेटिंग
                        </label>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              style={{
                                cursor: 'pointer',
                                transition: 'transform 0.15s',
                                transform: reviewForm.rating >= star ? 'scale(1.1)' : 'scale(1)',
                              }}
                            >
                              <Star
                                size={28}
                                style={{
                                  color: reviewForm.rating >= star ? '#D4AF37' : '#ddd',
                                  fill: reviewForm.rating >= star ? '#D4AF37' : 'none',
                                  transition: 'all 0.15s',
                                }}
                              />
                            </div>
                          ))}
                          <span style={{ fontSize: '13px', color: '#888', marginLeft: '8px', alignSelf: 'center' }}>
                            {reviewForm.rating}/5
                          </span>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                          आपका अनुभव
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={reviewForm.message}
                          onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                          onFocus={() => setFocusedField('rmsg')}
                          onBlur={() => setFocusedField('')}
                          placeholder="अपना अनुभव बताएं..."
                          style={{
                            ...inputStyle('rmsg'),
                            resize: 'none' as const,
                          }}
                        />
                      </div>

                      {/* Error */}
                      {reviewError && (
                        <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px' }}>{reviewError}</div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={reviewSaving}
                        onMouseEnter={() => setReviewHover(true)}
                        onMouseLeave={() => setReviewHover(false)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                          color: '#1a1a1a',
                          fontWeight: '600',
                          padding: '14px',
                          borderRadius: '12px',
                          fontSize: '14px',
                          border: 'none',
                          cursor: reviewSaving ? 'wait' : 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 4px 14px rgba(212,175,55,0.25)',
                          transform: reviewHover ? 'translateY(-1px)' : 'translateY(0)',
                          marginTop: '4px',
                          opacity: reviewSaving ? 0.7 : 1,
                        }}
                      >
                        <Star size={16} />
                        {reviewSaving ? 'जमा हो रहा है...' : 'फीडबैक जमा करें'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </PageTransition>
  );
}
