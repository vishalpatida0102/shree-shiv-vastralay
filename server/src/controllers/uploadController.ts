import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

export async function uploadImage(req: Request, res: Response) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    if (!req.file) {
      res.status(400).json({ message: 'कोई फ़ाइल अपलोड नहीं हुई' });
      return;
    }

    // Convert buffer to base64 data URI
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'shree_shiv_vastralay',
      transformation: [{ width: 800, quality: 'auto' }],
    });

    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'अपलोड विफल' });
  }
}
