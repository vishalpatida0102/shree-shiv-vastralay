import type { Testimonial } from '../types';

/**
 * सिर्फ़ fallback testimonials — जब तक एडमिन-अप्रूव्ड समीक्षाएँ (reviews API) न आएँ,
 * होमपेज पर ये दिखती हैं।
 *
 * दुकान की जानकारी (नाम, फ़ोन, पता, लोगो आदि) अब यहाँ नहीं है —
 * वह config/siteConfig.ts + /admin/settings से आती है।
 */
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'प्रिया शर्मा',
    location: 'नागपुर',
    text: 'बहुत ही सुंदर साड़ियाँ! मैंने अपनी बेटी की शादी के लिए यहाँ से बनारसी साड़ी ली थी। सबने तारीफ की। क्वालिटी बेहतरीन है।',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: '2',
    name: 'अंजली पटेल',
    location: 'मुंबई',
    text: 'ऑनलाइन ऑर्डर किया और साड़ी बिल्कुल वैसी ही आई जैसी फोटो में थी। पैकिंग भी बहुत अच्छी थी। बहुत खुश हूँ।',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
  {
    id: '3',
    name: 'सुनीता देशमुख',
    location: 'पुणे',
    text: 'पैठणी साड़ी का कलेक्शन कमाल का है। असली पैठणी मिलती है यहाँ। दाम भी उचित हैं। ज़रूर विज़िट करें।',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100',
  },
  {
    id: '4',
    name: 'रेखा जोशी',
    location: 'नागपुर',
    text: 'मैं पिछले 10 सालों से यहीं से साड़ियाँ खरीदती हूँ। हमेशा नए डिज़ाइन मिलते हैं और स्टाफ बहुत हेल्पफुल है।',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
  },
];
