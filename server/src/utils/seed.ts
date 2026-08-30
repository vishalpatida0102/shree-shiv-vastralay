import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin';

dotenv.config();

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@shreeshivvastralay.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
  } else {
    await Admin.create({ email, password });
    console.log(`Admin created: ${email}`);
  }
}

// Run standalone if called directly
if (require.main === module) {
  (async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log('Connected to MongoDB');
      await seedAdmin();
      await mongoose.disconnect();
      console.log('Done');
      process.exit(0);
    } catch (err) {
      console.error('Seed error:', err);
      process.exit(1);
    }
  })();
}
