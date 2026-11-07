import mongoose from 'mongoose';

export const INCOME_TYPES = ['Income', 'Expense'];

const incomeExpenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, default: '' },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: INCOME_TYPES },
  },
  { timestamps: true }
);

export default mongoose.model('IncomeExpense', incomeExpenseSchema);
