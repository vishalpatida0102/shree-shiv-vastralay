import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_CONFIG } from '../config/siteConfig';
import type { SiteConfig } from '../config/siteConfig';
import { configApi } from '../services/api';

const CACHE_KEY = 'nagpur_wala_site_config';

/**
 * सर्वर से आए config को DEFAULT_CONFIG के ऊपर मर्ज करता है।
 * जो फ़ील्ड सर्वर पर नहीं है (या null है) उसके लिए डिफ़ॉल्ट इस्तेमाल होगा —
 * इससे नया फ़ील्ड जोड़ने पर पुराने DB document से UI नहीं टूटता।
 *
 * खाली array को खाली ही रखा जाता है (एडमिन ने जानबूझकर हटाया हो सकता है)।
 */
function mergeConfig<T>(base: T, incoming: unknown): T {
  if (incoming === undefined || incoming === null) return base;
  if (Array.isArray(base)) return (Array.isArray(incoming) ? incoming : base) as T;
  if (typeof base !== 'object') return incoming as T;

  const src = incoming as Record<string, unknown>;
  const out = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(out)) {
    out[key] = mergeConfig(out[key], src[key]);
  }
  return out as T;
}

function readCache(): SiteConfig {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? mergeConfig(DEFAULT_CONFIG, JSON.parse(raw)) : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

interface ConfigContextValue {
  config: SiteConfig;
  isLoading: boolean;
  /** एडमिन में सेव करने के बाद ताज़ा डेटा खींचने के लिए */
  refresh: () => Promise<void>;
  /** तैयार WhatsApp लिंक — नंबर config से आता है */
  whatsappLink: (message: string) => string;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  // पहले रेंडर पर कैश्ड वैल्यू — इससे डिफ़ॉल्ट कंटेंट का flash नहीं होता
  const [config, setConfig] = useState<SiteConfig>(readCache);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await configApi.get();
      const merged = mergeConfig(DEFAULT_CONFIG, data);
      setConfig(merged);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(merged));
      } catch {
        // storage भरा हो तो चुपचाप छोड़ें — कैश सिर्फ़ optimization है
      }
    } catch {
      // API न चले तो कैश/डिफ़ॉल्ट पर ही साइट चलती रहे
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // favicon config से सेट करें।
  // टाइटल यहाँ नहीं छूते — वह <SEO> कंपोनेंट (react-helmet) संभालता है,
  // वरना यह effect पेज-विशेष टाइटल को बेस टाइटल से बदल देता।
  useEffect(() => {
    const logo = config.identity.logo;
    if (!logo) return;
    const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (link) link.href = logo;
  }, [config.identity.logo]);

  const whatsappLink = useCallback(
    (message: string) =>
      `https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`,
    [config.contact.whatsapp]
  );

  return (
    <ConfigContext.Provider value={{ config, isLoading, refresh: load, whatsappLink }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig को ConfigProvider के अंदर इस्तेमाल करें');
  return ctx;
}

/** सिर्फ़ config object चाहिए तो ये छोटा हुक */
export function useSiteConfig(): SiteConfig {
  return useConfig().config;
}
