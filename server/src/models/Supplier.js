import mongoose from 'mongoose';

export const SUPPLIER_STATUSES = ['Active', 'Deactive'];

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    suppliers: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: SUPPLIER_STATUSES },
  },
  { timestamps: true }
);

supplierSchema.index({ name: 'text' });

export default mongoose.model('Supplier', supplierSchema);
