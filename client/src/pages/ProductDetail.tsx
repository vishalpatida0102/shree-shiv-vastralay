import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Share2, Heart, X, Check, Truck, Shield, ArrowLeft, Copy } from 'lucide-react';
import SEO from '../components/ui/SEO';
import PageTransition from '../components/animations/PageTransition';
import SareeCard from '../components/catalog/SareeCard';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';
import StaggerChildren from '../components/animations/StaggerChildren';
import ScrollReveal from '../components/animations/ScrollReveal';
import { productsApi } from '../services/api';
import { toSaree } from '../services/helpers';
import { shopInfo } from '../data/dummyData';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useToast } from '../context/ToastContext';
import type { Saree } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const [saree, setSaree] = useState<Saree | null>(null);
  const [related, setRelated] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem: addRecentlyViewed } = useRecentlyViewed();
  const { showToast } = useToast();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    if (!id) return;
    let active = true;

    setSaree(null);
    setRelated([]);
    setLoading(true);
    setNotFound(false);
    setSelectedImage(0);

    (async () => {
      try {
        const product = await productsApi.getOne(id);
        if (!active) return;
        const s = toSaree(product);
        setSaree(s);
        addRecentlyViewed({ id: s.id, name: s.name, price: s.price, image: s.images[0] });
        const catId = typeof product.category === 'object' ? product.category._id : product.category;
        const prods = await productsApi.getAll({ category: catId });
        if (!active) return;
        setRelated(prods.filter((p) => p._id !== id).map(toSaree).slice(0, 4));
      } catch {
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [id, addRecentlyViewed]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (notFound || !saree) {
    return (
      <div style={{ paddingTop: '100px', paddingBottom: '80px', textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <h2 className="font-heading" style={{ fontSize: '22px', color: '#B8960C', fontWeight: '700' }}>साड़ी नहीं मिली</h2>
        <Link to="/sarees" style={{ color: '#B8960C', fontWeight: '600', fontSize: '14px' }}>← वापस जाएँ</Link>
      </div>
    );
  }

  const liked = isFavorite(saree.id);
  const productLink = `${window.location.origin}/saree/${saree.id}`;
  const whatsappMsg = `नमस्ते! मुझे इस साड़ी के बारे में जानकारी चाहिए:\n\n*${saree.name}*\n💰 ₹${saree.price.toLocaleString('hi-IN')}\n🔗 ${productLink}`;
  const whatsappUrl = `https://wa.me/${shopInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappMsg)}`;
  const discount = saree.originalPrice ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100) : 0;

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % saree.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + saree.images.length) % saree.images.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      isSwiping.current = true;
      if (dx < 0) nextImage();
      else prevImage();
    }
  };
  const handleImageClick = () => {
    if (!isSwiping.current) setIsZoomed(true);
  };

  return (
    <PageTransition>
      <SEO title={saree.name} description={saree.description} image={saree.images[0]} />
      <div style={{ paddingTop: '68px', paddingBottom: '100px', minHeight: '100vh' }}>

        {/* Breadcrumb */}
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

          {/* Image Gallery */}
          <div>
            <div
              style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#f5f0eb', aspectRatio: '3/4', cursor: 'zoom-in' }}
              onClick={handleImageClick}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
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

              <Link to="/sarees" onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '12px', left: '12px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textDecoration: 'none' }}>
                <ArrowLeft size={18} style={{ color: '#2D2D2D' }} />
              </Link>

              <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                <div onClick={(e) => { e.stopPropagation(); toggleFavorite(saree.id); showToast(liked ? 'पसंदीदा से हटाया गया' : 'पसंदीदा में जोड़ा गया', liked ? 'info' : 'success'); }} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: liked ? '#B8960C' : 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <Heart size={18} style={{ color: liked ? '#fff' : '#555', fill: liked ? '#fff' : 'none' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <div onClick={(e) => { e.stopPropagation(); setShowShareMenu(!showShareMenu); }} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: showShareMenu ? '#B8960C' : 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.2s' }}>
                    <Share2 size={16} style={{ color: showShareMenu ? '#fff' : '#555' }} />
                  </div>
                  {showShareMenu && (
                    <>
                      <div onClick={(e) => { e.stopPropagation(); setShowShareMenu(false); }} style={{ position: 'fixed', inset: 0, zIndex: 5 }} />
                      <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 6px 24px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 6, minWidth: '180px' }}>
                        <div
                          onClick={() => {
                            const shareText = `${saree.name} - ₹${saree.price.toLocaleString('hi-IN')}\n${window.location.href}`;
                            const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
                            window.open(waUrl, '_blank');
                            setShowShareMenu(false);
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#25D366', borderBottom: '1px solid #f5f5f5' }}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          WhatsApp पर शेयर करें
                        </div>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            showToast('लिंक कॉपी हो गया!');
                            setShowShareMenu(false);
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#555' }}
                        >
                          <Copy size={16} />
                          लिंक कॉपी करें
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div onClick={(e) => { e.stopPropagation(); prevImage(); }} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                <ChevronLeft size={20} style={{ color: '#2D2D2D' }} />
              </div>
              <div onClick={(e) => { e.stopPropagation(); nextImage(); }} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                <ChevronRight size={20} style={{ color: '#2D2D2D' }} />
              </div>

              <div style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                {selectedImage + 1}/{saree.images.length}
              </div>

              {(saree.isNew || discount > 0) && (
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  {saree.isNew && (<span style={{ background: 'linear-gradient(135deg, #2D2D2D, #3a3a3a)', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>नया संग्रह</span>)}
                  {discount > 0 && (<span style={{ background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)', color: '#1a1a1a', fontSize: '10px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>{discount}% छूट</span>)}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {saree.images.map((img, i) => (
                <div key={i} onClick={() => setSelectedImage(i)} style={{ width: '64px', height: '80px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, cursor: 'pointer', border: selectedImage === i ? '2.5px solid #B8960C' : '2.5px solid transparent', opacity: selectedImage === i ? 1 : 0.6, transition: 'all 0.2s' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div style={{ paddingTop: '20px' }}>
            <ScrollReveal>
              <h1 className="font-heading" style={{ fontSize: '22px', fontWeight: '700', color: '#2D2D2D', margin: '0 0 12px 0', lineHeight: '1.3' }}>{saree.name}</h1>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '26px', fontWeight: '700', color: '#B8960C' }}>₹{saree.price.toLocaleString('hi-IN')}</span>
                {saree.originalPrice && (<span style={{ fontSize: '16px', color: '#aaa', textDecoration: 'line-through' }}>₹{saree.originalPrice.toLocaleString('hi-IN')}</span>)}
                {discount > 0 && (<span style={{ fontSize: '13px', fontWeight: '700', color: '#2e7d32', backgroundColor: 'rgba(46,125,50,0.08)', padding: '3px 10px', borderRadius: '6px' }}>{discount}% छूट</span>)}
              </div>

              <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '0 0 16px 0' }} />

              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.9', margin: '0 0 20px 0' }}>{saree.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {[
                  { label: 'कपड़ा', value: saree.fabric, color: '#B8960C', bg: 'rgba(184,150,12,0.04)' },
                  { label: 'रंग', value: saree.color, color: '#7b1fa2', bg: 'rgba(123,31,162,0.04)' },
                  { label: 'अवसर', value: saree.occasion, color: '#1565c0', bg: 'rgba(21,101,192,0.04)' },
                  { label: 'उपलब्धता', value: saree.inStock ? 'स्टॉक में है' : 'उपलब्ध नहीं', color: saree.inStock ? '#2e7d32' : '#c62828', bg: saree.inStock ? 'rgba(46,125,50,0.04)' : 'rgba(198,40,40,0.04)' },
                ].map((d) => (
                  <div key={d.label} style={{ backgroundColor: d.bg, borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <p style={{ fontSize: '10px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>{d.label}</p>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: d.color, margin: 0 }}>{d.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', padding: '14px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
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

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#25D366', color: '#fff', fontWeight: '700', padding: '15px', borderRadius: '14px', fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.3)', marginBottom: '12px' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                इस साड़ी के बारे में पूछें
              </a>

              <a href={`tel:${shopInfo.phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'transparent', color: '#B8960C', fontWeight: '600', padding: '13px', borderRadius: '14px', fontSize: '14px', textDecoration: 'none', border: '1.5px solid #B8960C' }}>
                📞 कॉल करें — {shopInfo.phone.replace('+91', '')}
              </a>
            </ScrollReveal>
          </div>
        </div>

        {/* Related Sarees */}
        {related.length > 0 && (
          <section style={{ marginTop: '48px', padding: '0 16px', maxWidth: '1200px', margin: '48px auto 0' }}>
            <ScrollReveal>
              <div style={{ marginBottom: '20px' }}>
                <span
                  className="font-heading"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    fontWeight: '700',
                    padding: '8px 22px',
                    borderRadius: '50px',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 8px rgba(184,150,12,0.25)',
                  }}
                >
                  इसी श्रेणी की अन्य साड़ियाँ
                </span>
              </div>
            </ScrollReveal>
            <StaggerChildren>
              <div id="related-grid">
                {related.map((s) => (<SareeCard key={s.id} saree={s} />))}
              </div>
            </StaggerChildren>
          </section>
        )}
      </div>

      {/* Fullscreen Image Zoom */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
            onClick={() => setIsZoomed(false)}
          >
            <div onClick={() => setIsZoomed(false)} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={22} style={{ color: '#fff' }} />
            </div>
            <div onClick={(e) => { e.stopPropagation(); prevImage(); }} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ChevronLeft size={26} style={{ color: '#fff' }} />
            </div>
            <motion.img key={selectedImage} src={saree.images[selectedImage]} alt={saree.name} style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.2 }} />
            <div onClick={(e) => { e.stopPropagation(); nextImage(); }} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ChevronRight size={26} style={{ color: '#fff' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              {saree.images.map((_, i) => (
                <div key={i} onClick={(e) => { e.stopPropagation(); setSelectedImage(i); }} style={{ width: selectedImage === i ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: selectedImage === i ? '#D4AF37' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
