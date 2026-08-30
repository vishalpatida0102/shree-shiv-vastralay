import {
  Truck, Clock, CreditCard, Package, Gem, Shield, Heart, Star, Award,
  Sparkles, ShoppingBag, Gift, MapPin, Phone, Mail, Users, ThumbsUp,
  BadgeCheck, Scissors, Crown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * एडमिन पैनल में आइकॉन नाम (string) चुना जाता है और DB में वही सेव होता है।
 * यहाँ उस नाम को असली आइकॉन कंपोनेंट से जोड़ा गया है।
 */
export const ICONS: Record<string, LucideIcon> = {
  Truck, Clock, CreditCard, Package, Gem, Shield, Heart, Star, Award,
  Sparkles, ShoppingBag, Gift, MapPin, Phone, Mail, Users, ThumbsUp,
  BadgeCheck, Scissors, Crown,
};

export const ICON_NAMES = Object.keys(ICONS);

/** अनजान नाम आने पर भी UI न टूटे — Sparkles fallback */
export function getIcon(name: string): LucideIcon {
  return ICONS[name] || Sparkles;
}
