import Customer from '../models/Customer.js';
import Product from '../models/Product.js';
import Supplier from '../models/Supplier.js';
import IncomeExpense from '../models/IncomeExpense.js';

export async function getDashboard(req, res, next) {
  try {
    const [allProducts, allSuppliers, allCustomers, recentCustomers, incomeExpenses] =
      await Promise.all([
        Product.countDocuments(),
        Supplier.countDocuments(),
        Customer.countDocuments(),
        Customer.find().sort({ createdAt: -1 }).limit(5).select('name email avatar spent'),
        IncomeExpense.find().sort({ createdAt: -1 }).select('name email amount type'),
      ]);

    res.status(200).json({
      stats: {
        allProducts,
        allSuppliers,
        allCustomers,
      },
      recentCustomers,
      incomeExpenses,
    });
  } catch (err) {
    next(err);
  }
}
