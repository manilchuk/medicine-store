import mongoose from 'mongoose';

export const PRODUCT_CATEGORIES = [
  'Medicine',
  'Head',
  'Hand',
  'Dental Care',
  'Skin Care',
  'Eye Care',
  'Vitamins & Supplements',
  'Orthopedic Products',
  'Baby Care',
];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: '' },
    suppliers: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: PRODUCT_CATEGORIES },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text' });

export default mongoose.model('Product', productSchema);
