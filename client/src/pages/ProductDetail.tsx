import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronLeft, ChevronRight, Share2, Heart, X, Check, Truck, Shield, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import SareeCard from '../components/catalog/SareeCard';
import StaggerChildren from '../components/animations/StaggerChildren';
import ScrollReveal from '../components/animations/ScrollReveal';
import { sarees, shopInfo } from '../data/dummyData';

export default function ProductDetail() {
  const { id } = useParams();
  const saree = sarees.find((s) => s.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!saree) {
    return (
      <div style={{
        paddingTop: '100px',
        paddingBottom: '80px',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h2 className="font-heading" style={{ fontSize: '22px', color: '#800020', fontWeight: '700' }}>
          साड़ी नहीं मिली
        </h2>
        <Link to="/sarees" style={{ color: '#800020', fontWeight: '600', fontSize: '14px' }}>
          ← वापस जाएँ
        </Link>
      </div>
    );
  }

  const related = sarees
    .filter((s) => s.category === saree.category && s.id !== saree.id)
    .slice(0, 4);

  const whatsappMsg = `नमस्ते! मुझे "${saree.name}" (₹${saree.price.toLocaleString('hi-IN')}) के बारे में जानकारी चाहिए।`;
  const whatsappUrl = `https://wa.me/${shopInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappMsg)}`;

  const discount = saree.originalPrice
    ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)
    : 0;

  const nextImage = () =>
    setSelectedImage((prev) => (prev + 1) % saree.images.length);
  const prevImage = () =>
    setSelectedImage(
      (prev) => (prev - 1 + saree.images.length) % saree.images.length
    );

  return (
    <PageTransition>
      <div style={{ paddingTop: '68px', paddingBottom: '100px', minHeight: '100vh' }}>

        {/* ═══════ Breadcrumb ═══════ */}
        <div style={{ padding: '12px 16px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#999', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#999', textDecoration: 'none' }}>होम</Link>
            <span style={{ color: '#ddd' }}>/</span>
            <Link to="/sarees" style={{ color: '#999', textDecoration: 'none' }}>साड़ियाँ</Link>
            <span style={{ color: '#ddd' }}>/</span>
            <span style={{ color: '#555', fontWeight: '500' }}>{saree.name}</span>
          </div>
        </div>

        <style>{`
          #pd-layout { display: block; }
          @media (min-width: 768px) { #pd-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; } }
          #related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
          @media (min-width: 768px) { #related-grid { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; } }
        `}</style>

        <div id="pd-layout" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>

          {/* ═══════ Image Gallery ═══════ */}
          <div>
            {/* Main Image */}
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#f5f0eb',
                aspectRatio: '3/4',
                cursor: 'zoom-in',
              }}
              onClick={() => setIsZoomed(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={saree.images[selectedImage]}
                  alt={saree.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>

              {/* Back button */}
              <Link
                to="/sarees"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={18} style={{ color: '#2D2D2D' }} />
              </Link>

              {/* Action buttons - top right */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: liked ? '#800020' : 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Heart size={18} style={{ color: liked ? '#fff' : '#555', fill: liked ? '#fff' : 'none' }} />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (navigator.share) {
                      navigator.share({ title: saree.name, url: window.location.href });
                    }
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Share2 size={16} style={{ color: '#555' }} />
                </div>
              </div>

              {/* Nav Arrows */}
              <div
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <ChevronLeft size={20} style={{ color: '#2D2D2D' }} />
              </div>
              <div
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <ChevronRight size={20} style={{ color: '#2D2D2D' }} />
              </div>

              {/* Image counter */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(0,0,0,0.55)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '12px',
                backdropFilter: 'blur(4px)',
              }}>
                {selectedImage + 1}/{saree.images.length}
              </div>

              {/* Badges */}
              {(saree.isNew || discount > 0) && (
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  {saree.isNew && (
                    <span style={{
                      background: 'linear-gradient(135deg, #800020, #a0002a)',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}>
                      नया संग्रह
                    </span>
                  )}
                  {discount > 0 && (
                    <span style={{
                      background: 'linear-gradient(135deg, #D4AF37, #c49a20)',
                      color: '#2D2D2D',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}>
                      {discount}% छूट
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '12px',
              overflowX: 'auto',
              paddingBottom: '4px',
            }}>
              {saree.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    width: '64px',
                    height: '80px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    cursor: 'pointer',
                    border: selectedImage === i ? '2.5px solid #800020' : '2.5px solid transparent',
                    opacity: selectedImage === i ? 1 : 0.6,
                    transition: 'all 0.2s',
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ Product Info ═══════ */}
          <div style={{ paddingTop: '20px' }}>
            <ScrollReveal>
              {/* Name */}
              <h1
                className="font-heading"
                style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#2D2D2D',
                  margin: '0 0 12px 0',
                  lineHeight: '1.3',
                }}
              >
                {saree.name}
              </h1>

              {/* Price Section */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: '26px', fontWeight: '700', color: '#800020' }}>
                  ₹{saree.price.toLocaleString('hi-IN')}
                </span>
                {saree.originalPrice && (
                  <span style={{ fontSize: '16px', color: '#aaa', textDecoration: 'line-through' }}>
                    ₹{saree.originalPrice.toLocaleString('hi-IN')}
                  </span>
                )}
                {discount > 0 && (
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#2e7d32',
                    backgroundColor: 'rgba(46,125,50,0.08)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                  }}>
                    {discount}% छूट
                  </span>
                )}
              </div>

              <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '0 0 16px 0' }} />

              {/* Description */}
              <p style={{
                fontSize: '13px',
                color: '#666',
                lineHeight: '1.9',
                margin: '0 0 20px 0',
              }}>
                {saree.description}
              </p>

              {/* Product Details Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '20px',
              }}>
                {[
                  { label: 'कपड़ा', value: saree.fabric, color: '#800020', bg: 'rgba(128,0,32,0.04)' },
                  { label: 'रंग', value: saree.color, color: '#7b1fa2', bg: 'rgba(123,31,162,0.04)' },
                  { label: 'अवसर', value: saree.occasion, color: '#1565c0', bg: 'rgba(21,101,192,0.04)' },
                  {
                    label: 'उपलब्धता',
                    value: saree.inStock ? 'स्टॉक में है' : 'उपलब्ध नहीं',
                    color: saree.inStock ? '#2e7d32' : '#c62828',
                    bg: saree.inStock ? 'rgba(46,125,50,0.04)' : 'rgba(198,40,40,0.04)',
                  },
                ].map((d) => (
                  <div key={d.label} style={{
                    backgroundColor: d.bg,
                    borderRadius: '12px',
                    padding: '12px 14px',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}>
                    <p style={{ fontSize: '10px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
                      {d.label}
                    </p>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: d.color, margin: 0 }}>
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                padding: '14px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #f0f0f0',
              }}>
                {[
                  { icon: Truck, text: 'तेज़ डिलीवरी' },
                  { icon: Shield, text: 'असली गारंटी' },
                  { icon: Check, text: 'क्वालिटी चेक' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} style={{ flex: 1, textAlign: 'center' }}>
                      <Icon size={18} style={{ color: '#D4AF37', margin: '0 auto 4px' }} />
                      <p style={{ fontSize: '10px', fontWeight: '600', color: '#888', margin: 0 }}>{item.text}</p>
                    </div>
                  );
                })}
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
                  padding: '15px',
                  borderRadius: '14px',
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                  marginBottom: '12px',
                }}
              >
                <MessageCircle size={22} fill="white" />
                इस साड़ी के बारे में पूछें
              </a>

              {/* Secondary action */}
              <a
                href={`tel:${shopInfo.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#800020',
                  fontWeight: '600',
                  padding: '13px',
                  borderRadius: '14px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  border: '1.5px solid #800020',
                }}
              >
                📞 कॉल करें — {shopInfo.phone.replace('+91', '')}
              </a>
            </ScrollReveal>
          </div>
        </div>

        {/* ═══════ Related Sarees ═══════ */}
        {related.length > 0 && (
          <section style={{ marginTop: '48px', padding: '0 16px', maxWidth: '1200px', margin: '48px auto 0' }}>
            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '3px', height: '22px', backgroundColor: '#800020', borderRadius: '2px' }} />
                <h2
                  className="font-heading"
                  style={{ fontSize: '18px', fontWeight: '700', color: '#2D2D2D', margin: 0 }}
                >
                  इसी श्रेणी की अन्य साड़ियाँ
                </h2>
              </div>
            </ScrollReveal>
            <StaggerChildren>
              <div id="related-grid">
                {related.map((s) => (
                  <SareeCard key={s.id} saree={s} />
                ))}
              </div>
            </StaggerChildren>
          </section>
        )}
      </div>

      {/* ═══════ Fullscreen Image Zoom ═══════ */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              backgroundColor: 'rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            onClick={() => setIsZoomed(false)}
          >
            {/* Close */}
            <div
              onClick={() => setIsZoomed(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={22} style={{ color: '#fff' }} />
            </div>

            {/* Prev */}
            <div
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={26} style={{ color: '#fff' }} />
            </div>

            {/* Image */}
            <motion.img
              key={selectedImage}
              src={saree.images[selectedImage]}
              alt={saree.name}
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Next */}
            <div
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={26} style={{ color: '#fff' }} />
            </div>

            {/* Counter + Thumbnails */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              {saree.images.map((_, i) => (
                <div
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(i); }}
                  style={{
                    width: selectedImage === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: selectedImage === i ? '#D4AF37' : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
