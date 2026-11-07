import Customer from '../models/Customer.js';
import Order from '../models/Order.js';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function getCustomers(req, res, next) {
  try {
    const { name = '', page = 1, limit = 5 } = req.query;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (name.trim()) {
      filter.name = { $regex: escapeRegex(name.trim()), $options: 'i' };
    }

    const [customers, total] = await Promise.all([
      Customer.find(filter).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limitNum),
      Customer.countDocuments(filter),
    ]);

    res.status(200).json({
      customers,
      total,
      page: pageNum,
      totalPages: Math.max(1, Math.ceil(total / limitNum)),
    });
  } catch (err) {
    next(err);
  }
}

export async function getCustomerById(req, res, next) {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const orders = await Order.find({ name: customer.name }).sort({
      createdAt: -1,
      _id: -1,
    });

    res.status(200).json({
      customer,
      orders,
    });
  } catch (err) {
    next(err);
  }
}
