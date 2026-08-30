import mongoose, { Schema, Document } from 'mongoose';

/**
 * साइट कॉन्फ़िग — पूरी वेबसाइट का स्टैटिक कंटेंट।
 *
 * यह एक singleton collection है: हमेशा सिर्फ़ एक ही document रहता है
 * (key: 'site')। एडमिन पैनल से यही document अपडेट होता है।
 *
 * Shape client/src/config/siteConfig.ts के SiteConfig type से मेल खाना चाहिए।
 */

export interface ISiteConfig extends Document {
  key: string;
  identity: {
    name: string;
    nameEn: string;
    tagline: string;
    taglineEn: string;
    logo: string;
    loginBackground: string;
  };
  contact: {
    phone: string;
    phone2: string;
    whatsapp: string;
    email: string;
    address: string;
    mapUrl: string;
    timings: { label: string; hours: string }[];
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  whatsappMessages: {
    general: string;
    order: string;
    product: string;
  };
  hero: {
    slides: { image: string; title: string; subtitle: string; isLogo: boolean }[];
    ctaText: string;
    ctaLink: string;
  };
  stats: { value: number; suffix: string; label: string }[];
  delivery: {
    highlights: { icon: string; title: string; desc: string; color: string }[];
    steps: { title: string; desc: string }[];
    requiredFields: string[];
    notes: string[];
    ctaText: string;
  };
  about: {
    story: string;
    quote: string;
    highlights: string[];
    values: { icon: string; color: string; bg: string; title: string; desc: string }[];
    whyChooseUs: { title: string; desc: string }[];
    parallaxImage: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const timingSchema = new Schema(
  {
    label: { type: String, default: '' },
    hours: { type: String, default: '' },
  },
  { _id: false }
);

const heroSlideSchema = new Schema(
  {
    image: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    isLogo: { type: Boolean, default: false },
  },
  { _id: false }
);

const statSchema = new Schema(
  {
    value: { type: Number, default: 0 },
    suffix: { type: String, default: '+' },
    label: { type: String, default: '' },
  },
  { _id: false }
);

const deliveryHighlightSchema = new Schema(
  {
    icon: { type: String, default: 'Sparkles' },
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    color: { type: String, default: '#D4AF37' },
  },
  { _id: false }
);

const deliveryStepSchema = new Schema(
  {
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
  },
  { _id: false }
);

const aboutValueSchema = new Schema(
  {
    icon: { type: String, default: 'Sparkles' },
    color: { type: String, default: '#D4AF37' },
    bg: { type: String, default: 'rgba(212,175,55,0.08)' },
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
  },
  { _id: false }
);

const siteConfigSchema = new Schema<ISiteConfig>(
  {
    // singleton lock — हमेशा 'site'
    key: { type: String, default: 'site', unique: true, immutable: true },

    identity: {
      name: { type: String, default: '' },
      nameEn: { type: String, default: '' },
      tagline: { type: String, default: '' },
      taglineEn: { type: String, default: '' },
      logo: { type: String, default: '/logo.jpeg' },
      loginBackground: { type: String, default: '' },
    },

    contact: {
      phone: { type: String, default: '' },
      phone2: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      email: { type: String, default: '' },
      address: { type: String, default: '' },
      mapUrl: { type: String, default: '' },
      timings: { type: [timingSchema], default: [] },
    },

    social: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },

    whatsappMessages: {
      general: { type: String, default: '' },
      order: { type: String, default: '' },
      product: { type: String, default: '' },
    },

    hero: {
      slides: { type: [heroSlideSchema], default: [] },
      ctaText: { type: String, default: '' },
      ctaLink: { type: String, default: '/sarees' },
    },

    stats: { type: [statSchema], default: [] },

    delivery: {
      highlights: { type: [deliveryHighlightSchema], default: [] },
      steps: { type: [deliveryStepSchema], default: [] },
      requiredFields: { type: [String], default: [] },
      notes: { type: [String], default: [] },
      ctaText: { type: String, default: '' },
    },

    about: {
      story: { type: String, default: '' },
      quote: { type: String, default: '' },
      highlights: { type: [String], default: [] },
      values: { type: [aboutValueSchema], default: [] },
      whyChooseUs: { type: [deliveryStepSchema], default: [] },
      parallaxImage: { type: String, default: '' },
    },

    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      ogImage: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISiteConfig>('SiteConfig', siteConfigSchema);
