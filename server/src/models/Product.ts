import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: mongoose.Types.ObjectId;
  fabric: string;
  color: string;
  occasion: string;
  isNewArrival: boolean;
  isFeatured: boolean;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    fabric: { type: String, required: true },
    color: { type: String, required: true },
    occasion: { type: String, required: true },
    isNewArrival: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
