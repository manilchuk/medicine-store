import Joi from 'joi';
import { SUPPLIER_STATUSES } from '../models/Supplier.js';

const supplierFields = {
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Supplier name is required',
    'string.min': 'Supplier name must be at least 2 characters',
    'any.required': 'Supplier name is required',
  }),
  address: Joi.string().trim().min(2).max(200).required().messages({
    'any.required': 'Address is required',
  }),
  suppliers: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Company is required',
  }),
  date: Joi.string().trim().required().messages({
    'any.required': 'Delivery date is required',
  }),
  amount: Joi.number().min(0).required().messages({
    'number.base': 'Amount must be a number',
    'number.min': 'Amount cannot be negative',
    'any.required': 'Amount is required',
  }),
  status: Joi.string()
    .valid(...SUPPLIER_STATUSES)
    .required()
    .messages({
      'any.only': `Status must be one of: ${SUPPLIER_STATUSES.join(', ')}`,
      'any.required': 'Status is required',
    }),
};

export const createSupplierSchema = Joi.object(supplierFields);

export const updateSupplierSchema = Joi.object({
  name: supplierFields.name.optional(),
  address: supplierFields.address.optional(),
  suppliers: supplierFields.suppliers.optional(),
  date: supplierFields.date.optional(),
  amount: supplierFields.amount.optional(),
  status: supplierFields.status.optional(),
}).min(1);
