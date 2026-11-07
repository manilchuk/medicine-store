import Supplier from '../models/Supplier.js';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function getSuppliers(req, res, next) {
  try {
    const { name = '', page = 1, limit = 5 } = req.query;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (name.trim()) {
      filter.name = { $regex: escapeRegex(name.trim()), $options: 'i' };
    }

    const [suppliers, total] = await Promise.all([
      Supplier.find(filter).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limitNum),
      Supplier.countDocuments(filter),
    ]);

    res.status(200).json({
      suppliers,
      total,
      page: pageNum,
      totalPages: Math.max(1, Math.ceil(total / limitNum)),
    });
  } catch (err) {
    next(err);
  }
}

export async function createSupplier(req, res, next) {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    next(err);
  }
}

export async function updateSupplier(req, res, next) {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findByIdAndUpdate(supplierId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json(supplier);
  } catch (err) {
    next(err);
  }
}
