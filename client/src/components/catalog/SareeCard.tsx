import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Saree } from '../../types';
import { staggerItem } from '../animations/StaggerChildren';
import { useFavorites } from '../../hooks/useFavorites';
import { useToast } from '../../context/ToastContext';

interface SareeCardProps {
  saree: Saree;
}

export default function SareeCard({ saree }: SareeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const liked = isFavorite(saree.id);

  const discount = saree.originalPrice
    ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)
    : 0;

  return (
    <motion.div variants={staggerItem}>
      <Link
        to={`/saree/${saree.id}`}
        style={{ display: 'block', textDecoration: 'none' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: isHovered
              ? '0 8px 28px rgba(184,150,12,0.15)'
              : '0 1px 6px rgba(0,0,0,0.06)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', backgroundColor: '#f5f0eb' }}>
            <img
              src={isHovered && saree.images[1] ? saree.images[1] : saree.images[0]}
              alt={saree.name}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />

            {/* Subtle gradient overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)',
              pointerEvents: 'none',
            }} />

            {/* Badges - top left */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {saree.isNew && (
                <span style={{
                  background: 'linear-gradient(135deg, #2D2D2D, #3a3a3a)',
                  color: '#D4AF37',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '3px 9px',
                  borderRadius: '20px',
                  letterSpacing: '0.5px',
                }}>
                  नया
                </span>
              )}
              {discount > 0 && (
                <span style={{
                  background: 'linear-gradient(135deg, #D4AF37, #c49a20)',
                  color: '#2D2D2D',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '3px 9px',
                  borderRadius: '20px',
                }}>
                  {discount}% छूट
                </span>
              )}
            </div>

            {/* Wishlist heart - top right */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(saree.id);
                showToast(liked ? 'पसंदीदा से हटाया गया' : 'पसंदीदा में जोड़ा गया', liked ? 'info' : 'success');
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: liked ? '#B8960C' : 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
              }}
            >
              <Heart
                size={14}
                style={{
                  color: liked ? '#fff' : '#B8960C',
                  fill: liked ? '#fff' : 'none',
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div style={{ padding: '10px 10px 12px' }}>
            {/* Fabric tag */}
            <p style={{
              fontSize: '9px',
              fontWeight: '600',
              color: '#D4AF37',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '3px',
            }}>
              {saree.fabric}
            </p>

            {/* Saree name */}
            <h3
              className="font-heading"
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: isHovered ? '#B8960C' : '#2D2D2D',
                lineHeight: '1.3',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
                margin: 0,
              }}
            >
              {saree.name}
            </h3>

            {/* Price row */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '5px',
              marginTop: '6px',
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontSize: '15px',
                fontWeight: '700',
                color: '#B8960C',
              }}>
                ₹{saree.price.toLocaleString('hi-IN')}
              </span>
              {saree.originalPrice && (
                <span style={{
                  fontSize: '11px',
                  color: '#aaa',
                  textDecoration: 'line-through',
                }}>
                  ₹{saree.originalPrice.toLocaleString('hi-IN')}
                </span>
              )}
              {discount > 0 && (
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#2e7d32',
                }}>
                  {discount}% off
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
