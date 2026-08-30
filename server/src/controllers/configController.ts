import { Request, Response } from 'express';
import SiteConfig from '../models/SiteConfig';
import { defaultConfig } from '../utils/defaultConfig';
import { deleteCloudinaryImage } from '../utils/cloudinary';

/** एडमिन इन फ़ील्ड्स को नहीं बदल सकता */
const PROTECTED_FIELDS = ['_id', 'key', '__v', 'createdAt', 'updatedAt'];

/**
 * singleton document लौटाता है। पहली बार कॉल होने पर
 * defaultConfig से बना देता है, ताकि एडमिन को खाली फ़ॉर्म न मिले।
 */
async function getOrCreateConfig() {
  const existing = await SiteConfig.findOne({ key: 'site' });
  if (existing) return existing;
  return SiteConfig.create(defaultConfig);
}

/** GET /api/config — पब्लिक, वेबसाइट हर लोड पर यही पढ़ती है */
export async function getConfig(_req: Request, res: Response) {
  try {
    const config = await getOrCreateConfig();
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}

/** PUT /api/config — सिर्फ़ एडमिन */
export async function updateConfig(req: Request, res: Response) {
  try {
    const existing = await getOrCreateConfig();

    const update = { ...req.body };
    PROTECTED_FIELDS.forEach((field) => delete update[field]);

    const config = await SiteConfig.findOneAndUpdate(
      { key: 'site' },
      { $set: update },
      { new: true, runValidators: true }
    );

    // बदली गई पुरानी इमेज Cloudinary से हटाएँ
    // (लोकल /public इमेज पर extractPublicId null देता है, इसलिए वे सुरक्षित हैं)
    const oldImages = collectImages(existing.toObject());
    const newImages = new Set(collectImages(config!.toObject()));
    oldImages
      .filter((url) => url && !newImages.has(url))
      .forEach((url) => deleteCloudinaryImage(url));

    res.json(config);
  } catch (err) {
    res.status(400).json({ message: 'अमान्य डेटा' });
  }
}

/** config में मौजूद सभी इमेज URL इकट्ठा करता है */
function collectImages(cfg: Record<string, any>): string[] {
  return [
    cfg?.identity?.logo,
    cfg?.identity?.loginBackground,
    cfg?.about?.parallaxImage,
    cfg?.seo?.ogImage,
    ...(cfg?.hero?.slides || []).map((s: { image: string }) => s.image),
  ].filter(Boolean);
}

/** POST /api/config/reset — डिफ़ॉल्ट कंटेंट वापस लाएँ (सिर्फ़ एडमिन) */
export async function resetConfig(_req: Request, res: Response) {
  try {
    const { key, ...rest } = defaultConfig;
    const config = await SiteConfig.findOneAndUpdate(
      { key: 'site' },
      { $set: rest },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}
