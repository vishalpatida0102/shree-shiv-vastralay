/**
 * पहली बार config document बनाते समय ये वैल्यू सीड होती हैं।
 * इसके बाद सब कुछ एडमिन पैनल (/admin/settings) से बदला जाता है।
 *
 * client/src/config/siteConfig.ts के DEFAULT_CONFIG की मिरर कॉपी।
 */
export const defaultConfig = {
  key: 'site',
  identity: {
    name: 'श्री शिव वस्त्रालय',
    nameEn: 'Shree Shiv Vastralay',
    tagline: 'जहाँ परंपरा मिलती है फैशन से',
    taglineEn: 'Where tradition meets fashion',
    logo: '/logo.jpeg',
    loginBackground: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  },
  contact: {
    phone: '+919926598052',
    phone2: '+919516790305',
    whatsapp: '+919516790302',
    email: 'binodjibinod27@gmail.com',
    address: 'द्वारिका वाटी मार्केट, जयस्तम्भ चौराहा, बड़वाह, मध्य प्रदेश',
    mapUrl: 'https://maps.google.com/maps?q=Shree+shiv+vastralay+Dwarika+vati+market+jaystambh+choraha+barwaha&output=embed',
    timings: [
      { label: 'सोम - शनि', hours: 'सुबह 10:00 - रात 9:00' },
      { label: 'रविवार', hours: 'सुबह 11:00 - शाम 6:00' },
    ],
  },
  social: {
    instagram: 'https://www.instagram.com/shree_shiv_vastralay_barwaha',
    facebook: '',
    youtube: '',
  },
  whatsappMessages: {
    general: 'नमस्ते! मुझे साड़ी के बारे में जानकारी चाहिए।',
    order: 'नमस्ते! मुझे साड़ी ऑर्डर करनी है।',
    product: 'नमस्ते! मुझे इस साड़ी के बारे में जानकारी चाहिए:\n\n*{name}*\n💰 ₹{price}\n🔗 {link}',
  },
  hero: {
    slides: [
      { image: '', title: 'श्री शिव वस्त्रालय', subtitle: 'जहाँ परंपरा मिलती है फैशन से', isLogo: true },
      {
        image: '/1772967136869 (1).png',
        title: 'जहाँ परंपरा मिलती है फैशन से',
        subtitle: 'एक्सक्लूसिव साड़ियाँ और ब्राइडल कलेक्शन — श्री शिव वस्त्रालय',
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
    notes: ['Cash on Delivery उपलब्ध नहीं है', 'कोई एक्सचेंज या रिटर्न नहीं'],
    ctaText: 'अभी ऑर्डर करें — WhatsApp',
  },
  about: {
    story: 'श्री शिव वस्त्रालय — जहाँ परंपरा मिलती है फैशन से। हम एक्सक्लूसिव साड़ियाँ और ब्राइडल कलेक्शन लेकर आए हैं जो कभी पुरानी नहीं होतीं। हमारा मानना है कि हर साड़ी एक कहानी कहती है — बुनकरों की कला, परंपरा की विरासत और पहनने वाली की शान। 39,000+ से ज़्यादा ग्राहकों का भरोसा ही हमारी पहचान है।',
    quote: 'हर साड़ी एक कहानी कहती है — बुनकरों की कला, परंपरा की विरासत और पहनने वाली की शान।',
    highlights: ['Exclusive Sarees', 'Bridal Collection', 'Elegance that never fades'],
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
    title: 'श्री शिव वस्त्रालय — जहाँ परंपरा मिलती है फैशन से',
    description: 'एक्सक्लूसिव साड़ियाँ और ब्राइडल कलेक्शन। सिल्क, बनारसी, पैठणी, कॉटन और डिज़ाइनर साड़ियाँ। श्री शिव वस्त्रालय — 39,000+ ग्राहकों का भरोसा।',
    ogImage: '',
  },
};
