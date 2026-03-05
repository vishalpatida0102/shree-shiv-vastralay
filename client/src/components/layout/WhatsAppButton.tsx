import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { shopInfo } from '../../data/dummyData';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${shopInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent('नमस्ते! मुझे साड़ी के बारे में जानकारी चाहिए।')}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '16px',
        zIndex: 44,
        backgroundColor: '#25D366',
        color: '#fff',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
        textDecoration: 'none',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="WhatsApp पर संपर्क करें"
    >
      <MessageCircle size={24} fill="white" />
    </motion.a>
  );
}
