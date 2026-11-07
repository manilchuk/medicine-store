import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    avatar: { type: String, default: '' },
    spent: { type: Number, default: 0 },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    register_date: { type: String, required: true },
  },
  { timestamps: true }
);

customerSchema.index({ name: 'text', email: 'text' });

export default mongoose.model('Customer', customerSchema);
