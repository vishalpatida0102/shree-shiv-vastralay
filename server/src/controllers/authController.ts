import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import { AuthRequest } from '../middleware/auth';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'ईमेल और पासवर्ड आवश्यक हैं' });
      return;
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      res.status(401).json({ message: 'गलत ईमेल या पासवर्ड' });
      return;
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'गलत ईमेल या पासवर्ड' });
      return;
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    if (!admin) {
      res.status(404).json({ message: 'एडमिन नहीं मिला' });
      return;
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'सर्वर में त्रुटि' });
  }
}
