import { v2 as cloudinary } from 'cloudinary';

function ensureConfig() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Extract public_id from Cloudinary URL
 * e.g. "https://res.cloudinary.com/xxx/image/upload/v123/nagpur_sarees/abc.jpg"
 * → "nagpur_sarees/abc"
 */
export function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(nagpur_sarees\/.+?)(?:\.\w+)?$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Delete a single image from Cloudinary by URL
 */
export async function deleteCloudinaryImage(url: string): Promise<void> {
  const publicId = extractPublicId(url);
  if (!publicId) return;

  ensureConfig();
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('Cloudinary delete failed:', publicId, err);
  }
}

/**
 * Delete multiple images from Cloudinary by URLs
 */
export async function deleteCloudinaryImages(urls: string[]): Promise<void> {
  const publicIds = urls.map(extractPublicId).filter((id): id is string => id !== null);
  if (publicIds.length === 0) return;

  ensureConfig();
  try {
    await cloudinary.api.delete_resources(publicIds);
  } catch (err) {
    console.error('Cloudinary bulk delete failed:', err);
  }
}
