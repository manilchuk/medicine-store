import mongoose from 'mongoose';

export const ORDER_STATUSES = [
  'Completed',
  'Confirmed',
  'Pending',
  'Cancelled',
  'Processing',
  'Shipped',
  'Delivered',
];

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: '' },
    address: { type: String, required: true },
    products: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: ORDER_STATUSES },
    order_date: { type: String, required: true },
  },
  { timestamps: true }
);

orderSchema.index({ name: 'text' });

export default mongoose.model('Order', orderSchema);
