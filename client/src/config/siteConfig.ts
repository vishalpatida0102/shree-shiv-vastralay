/**
 * साइट कॉन्फ़िग — वेबसाइट का सारा स्टैटिक डेटा।
 *
 * यह फ़ाइल सिर्फ़ shape (TypeScript type) और fallback defaults रखती है।
 * असली वैल्यू MongoDB से `GET /api/config` के ज़रिए आती हैं और
 * एडमिन पैनल (/admin/settings) से बदली जा सकती हैं।
 *
 * DEFAULT_CONFIG तब इस्तेमाल होता है जब API पहुँच से बाहर हो।
 */

export interface Timing {
  label: string;
  hours: string;
}

export interface HeroSlide {
  /** खाली छोड़ें अगर isLogo true है */
  image: string;
  title: string;
  subtitle: string;
  /** true = इमेज की जगह लोगो + ग्रेडिएंट बैकग्राउंड दिखेगा */
  isLogo: boolean;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface DeliveryHighlight {
  /** lucide आइकॉन का नाम — देखें config/icons.ts */
  icon: string;
  title: string;
  desc: string;
  color: string;
}

export interface DeliveryStep {
  title: string;
  desc: string;
}

export interface WhyChooseItem {
  title: string;
  desc: string;
}

export interface AboutValue {
  icon: string;
  color: string;
  bg: string;
  title: string;
  desc: string;
}

export interface SiteConfig {
  identity: {
    name: string;
    nameEn: string;
    tagline: string;
    taglineEn: string;
    logo: string;
    /** एडमिन लॉगिन पेज का साइड बैकग्राउंड */
    loginBackground: string;
  };
  contact: {
    phone: string;
    phone2: string;
    whatsapp: string;
    email: string;
    address: string;
    mapUrl: string;
    timings: Timing[];
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  /** WhatsApp पर भेजे जाने वाले तैयार मैसेज */
  whatsappMessages: {
    /** सामान्य पूछताछ — फ़्लोटिंग बटन, संपर्क पेज */
    general: string;
    /** ऑर्डर करने के लिए — डिलीवरी सेक्शन */
    order: string;
    /** प्रोडक्ट पेज — {name} {price} {link} बदल जाते हैं */
    product: string;
  };
  hero: {
    slides: HeroSlide[];
    ctaText: string;
    ctaLink: string;
  };
  stats: StatItem[];
  delivery: {
    highlights: DeliveryHighlight[];
    steps: DeliveryStep[];
    /** ऑर्डर के लिए ग्राहक से माँगी जाने वाली जानकारी */
    requiredFields: string[];
    /** ज़रूरी सूचनाएँ (जैसे COD उपलब्ध नहीं) */
    notes: string[];
    ctaText: string;
  };
  about: {
    story: string;
    quote: string;
    highlights: string[];
    values: AboutValue[];
    whyChooseUs: WhyChooseItem[];
    /** कोट सेक्शन का बैकग्राउंड */
    parallaxImage: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export const DEFAULT_CONFIG: SiteConfig = {
  identity: {
    name: 'नागपुर वाला',
    nameEn: 'Nagpur Wala',
    tagline: 'जहाँ परंपरा मिलती है फैशन से',
    taglineEn: 'Where tradition meets fashion',
    logo: '/logo.jpeg',
    loginBackground: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  },
  contact: {
    phone: '+919243165323',
    phone2: '+919752985509',
    whatsapp: '+919243165323',
    email: 'nagpurwala04@gmail.com',
    address: 'ग्राम नागपुर, सांवेर, इंदौर, मध्य प्रदेश',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1234567890!2d79.0882!3d21.1458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA4JzQ1LjAiTiA3OcKwMDUnMTcuNiJF!5e0!3m2!1sen!2sin!4v1234567890',
    timings: [
      { label: 'सोम - शनि', hours: 'सुबह 10:00 - रात 9:00' },
      { label: 'रविवार', hours: 'सुबह 11:00 - शाम 6:00' },
    ],
  },
  social: {
    instagram: 'https://instagram.com/nagpur_wala04',
    facebook: 'https://facebook.com/nagpurwala',
    youtube: '',
  },
  whatsappMessages: {
    general: 'नमस्ते! मुझे साड़ी के बारे में जानकारी चाहिए।',
    order: 'नमस्ते! मुझे साड़ी ऑर्डर करनी है।',
    product: 'नमस्ते! मुझे इस साड़ी के बारे में जानकारी चाहिए:\n\n*{name}*\n💰 ₹{price}\n🔗 {link}',
  },
  hero: {
    slides: [
      {
        image: '',
        title: 'नागपुर वाला',
        subtitle: 'जहाँ परंपरा मिलती है फैशन से',
        isLogo: true,
      },
      {
        image: '/1772967136869 (1).png',
        title: 'जहाँ परंपरा मिलती है फैशन से',
        subtitle: 'एक्सक्लूसिव साड़ियाँ और ब्राइडल कलेक्शन — नागपुर वाला',
        isLogo: false,
      },
      {
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1600',
        title: 'ब्राइडल कलेक्शन',
        subtitle: 'दुल्हन के लिए विशेष साड़ियाँ — ऐसी शान जो कभी पुरानी न हो',
        isLogo: false,
      },
    ],
    ctaText: 'संग्रह देखें',
    ctaLink: '/sarees',
  },
  stats: [
    { value: 39000, suffix: '+', label: 'Instagram फॉलोअर्स' },
    { value: 39000, suffix: '+', label: 'खुश ग्राहक' },
    { value: 1000, suffix: '+', label: 'साड़ियों का संग्रह' },
    { value: 25, suffix: '+', label: 'शहरों में डिलीवरी' },
  ],
  delivery: {
    highlights: [
      { icon: 'Truck', title: '₹80 प्रति साड़ी', desc: 'पूरे भारत में डिलीवरी', color: '#D4AF37' },
      { icon: 'Clock', title: '7 कार्य दिवस', desc: 'में डिलीवरी हो जाएगी', color: '#1565c0' },
      { icon: 'CreditCard', title: 'ऑनलाइन पेमेंट', desc: 'सिर्फ प्रीपेड ऑर्डर', color: '#2e7d32' },
      { icon: 'Package', title: '1 साड़ी से ऑर्डर', desc: 'कोई मिनिमम ऑर्डर नहीं', color: '#7b1fa2' },
    ],
    steps: [
      { title: 'साड़ी चुनें', desc: 'वेबसाइट पर पसंदीदा साड़ी देखें' },
      { title: 'WhatsApp पर बताएँ', desc: 'नाम, नंबर, पता, पिनकोड दें' },
      { title: 'पेमेंट करें', desc: 'ऑनलाइन पेमेंट करें' },
      { title: 'डिलीवरी पाएँ', desc: '7 कार्य दिवस में घर पहुँचे' },
    ],
    requiredFields: ['पूरा नाम', 'मोबाइल नंबर', 'पूरा पता', 'पिनकोड'],
    notes: [
      'Cash on Delivery उपलब्ध नहीं है',
      'कोई एक्सचेंज या रिटर्न नहीं',
    ],
    ctaText: 'अभी ऑर्डर करें — WhatsApp',
  },
  about: {
    story: 'नागपुर वाला — जहाँ परंपरा मिलती है फैशन से। हम एक्सक्लूसिव साड़ियाँ और ब्राइडल कलेक्शन लेकर आए हैं जो कभी पुरानी नहीं होतीं। हमारा मानना है कि हर साड़ी एक कहानी कहती है — बुनकरों की कला, परंपरा की विरासत और पहनने वाली की शान। 39,000+ से ज़्यादा ग्राहकों का भरोसा ही हमारी पहचान है।',
    quote: 'हर साड़ी एक कहानी कहती है — बुनकरों की कला, परंपरा की विरासत और पहनने वाली की शान।',
    highlights: [
      'Exclusive Sarees',
      'Bridal Collection',
      'Elegance that never fades',
    ],
    values: [
      {
        icon: 'Gem',
        color: '#D4AF37',
        bg: 'rgba(212,175,55,0.08)',
        title: 'गुणवत्ता',
        desc: 'हम सिर्फ सबसे बेहतरीन कपड़ों और शिल्प का चयन करते हैं। हर साड़ी गुणवत्ता की कसौटी पर खरी उतरती है।',
      },
      {
        icon: 'Shield',
        color: '#B8960C',
        bg: 'rgba(184,150,12,0.06)',
        title: 'परंपरा',
        desc: 'भारतीय बुनकरों की सदियों पुरानी कला और परंपरा को हम आगे बढ़ा रहे हैं। हर धागे में एक कहानी है।',
      },
      {
        icon: 'Heart',
        color: '#c62828',
        bg: 'rgba(198,40,40,0.06)',
        title: 'विश्वास',
        desc: 'तीन पीढ़ियों से हमारे ग्राहकों का विश्वास ही हमारी सबसे बड़ी पूंजी है। आपकी संतुष्टि हमारी प्राथमिकता।',
      },
    ],
    whyChooseUs: [
      { title: 'प्रीमियम क्वालिटी', desc: 'हर साड़ी को सावधानीपूर्वक चुना जाता है और गुणवत्ता जांच के बाद ही आप तक पहुँचती है।' },
      { title: 'सीधे बुनकरों से', desc: 'हम बनारस, पैठण और कांजीवरम के बुनकरों से सीधे साड़ियाँ लाते हैं — बिचौलिया नहीं।' },
      { title: 'उचित दाम', desc: 'सीधी खरीदारी का फायदा — आपको मिलती है बेहतरीन साड़ी, उचित दाम में।' },
      { title: 'पूरे भारत में डिलीवरी', desc: '25+ शहरों में सुरक्षित पैकिंग के साथ तेज़ डिलीवरी।' },
    ],
    parallaxImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200',
  },
  seo: {
    title: 'नागपुर वाला — जहाँ परंपरा मिलती है फैशन से',
    description: 'एक्सक्लूसिव साड़ियाँ और ब्राइडल कलेक्शन। सिल्क, बनारसी, पैठणी, कॉटन और डिज़ाइनर साड़ियाँ। नागपुर वाला — 39,000+ ग्राहकों का भरोसा।',
    ogImage: '',
  },
};

/** '+919243165323' → '9243165323' (दिखाने के लिए) */
export function displayPhone(phone: string): string {
  const digits = (phone || '').replace(/[^0-9]/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

/** 'https://instagram.com/nagpur_wala04' → '@nagpur_wala04' */
export function socialHandle(url: string): string {
  const slug = (url || '').replace(/\/+$/, '').split('/').pop() || '';
  return slug ? `@${slug}` : '';
}
