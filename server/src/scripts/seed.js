import 'dotenv/config';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';

import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Product, { PRODUCT_CATEGORIES } from '../models/Product.js';
import Order from '../models/Order.js';
import Supplier from '../models/Supplier.js';
import IncomeExpense from '../models/IncomeExpense.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');

const readJSON = async (filename) => {
  const raw = await fs.readFile(path.join(dataDir, filename), 'utf-8');
  return JSON.parse(raw);
};

// "2,300.50" | "৳ 6952.53" | "+249.88" | "-49.88" → Number
const parseMoney = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^\d.-]/g, '');
  const num = Number(cleaned);
  return Number.isNaN(num) ? 0 : num;
};

const seed = async () => {
  await connectDB();

  console.log('🧹 Clearing collections...');
  await Promise.all([
    User.deleteMany({}),
    Customer.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({}),
    Supplier.deleteMany({}),
    IncomeExpense.deleteMany({}),
  ]);

  // ── Admin user ──────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('vendor123', 10);
  await User.create({
    name: 'Clayton Santos',
    email: 'vendor@gmail.com',
    password: hashedPassword,
    role: 'admin',
  });
  console.log('✅ Admin user created: vendor@gmail.com / vendor123');

  // ── Customers ───────────────────────────────────────────
  const rawCustomers = await readJSON('customers.json');
  const customers = rawCustomers.map((c) => ({
    name: c.name,
    email: c.email,
    avatar: c.photo || c.image || '',
    spent: parseMoney(c.spent),
    phone: c.phone,
    address: c.address,
    register_date: c.register_date,
  }));
  await Customer.insertMany(customers);
  console.log(`✅ Customers: ${customers.length}`);

  // ── Products (remove duplicates by name+suppliers+category) ──
  const rawProducts = await readJSON('products.json');
  const seenProducts = new Set();
  const products = rawProducts
    .map((p) => ({
      name: p.name,
      photo: p.photo || '',
      suppliers: p.suppliers,
      stock: parseMoney(p.stock),
      price: parseMoney(p.price),
      category: PRODUCT_CATEGORIES.includes(p.category) ? p.category : 'Medicine',
    }))
    .filter((p) => {
      const key = `${p.name}|${p.suppliers}|${p.category}`;
      if (seenProducts.has(key)) return false;
      seenProducts.add(key);
      return true;
    });
  await Product.insertMany(products);
  console.log(`✅ Products: ${products.length} (deduplicated from ${rawProducts.length})`);

  // ── Orders ──────────────────────────────────────────────
  const rawOrders = await readJSON('orders.json');
  const orders = rawOrders.map((o) => ({
    name: o.name,
    photo: o.photo || '',
    address: o.address,
    products: parseMoney(o.products),
    price: parseMoney(o.price),
    status: o.status,
    order_date: o.order_date,
  }));
  await Order.insertMany(orders);
  console.log(`✅ Orders: ${orders.length}`);

  // ── Suppliers ───────────────────────────────────────────
  const rawSuppliers = await readJSON('suppliers.json');
  const suppliers = rawSuppliers.map((s) => ({
    name: s.name,
    address: s.address,
    suppliers: s.suppliers,
    date: s.date,
    amount: parseMoney(s.amount),
    status: s.status,
  }));
  await Supplier.insertMany(suppliers);
  console.log(`✅ Suppliers: ${suppliers.length}`);

  // ── Income/Expenses (keep all types, incl. 'Error') ────
  const rawIncome = await readJSON('Income-Expenses.json');
  const incomeExpenses = rawIncome.map((i) => ({
    name: i.name,
    email: i.email || '',
    amount: parseMoney(i.amount),
    type: i.type,
  }));
  await IncomeExpense.insertMany(incomeExpenses);
  console.log(`✅ Income/Expenses: ${incomeExpenses.length}`);

  console.log('\n🎉 Seeding complete!');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
