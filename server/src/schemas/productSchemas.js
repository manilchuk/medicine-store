import Joi from 'joi';
import { PRODUCT_CATEGORIES } from '../models/Product.js';

const productFields = {
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Product name is required',
    'string.min': 'Product name must be at least 2 characters',
    'any.required': 'Product name is required',
  }),
  photo: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'Photo must be a valid URL',
  }),
  category: Joi.string()
    .valid(...PRODUCT_CATEGORIES)
    .required()
    .messages({
      'any.only': `Category must be one of: ${PRODUCT_CATEGORIES.join(', ')}`,
      'any.required': 'Category is required',
    }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Stock must be a number',
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required',
  }),
  suppliers: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Suppliers is required',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price cannot be negative',
    'any.required': 'Price is required',
  }),
};

export const createProductSchema = Joi.object(productFields);

export const updateProductSchema = Joi.object({
  name: productFields.name.optional(),
  photo: productFields.photo,
  category: productFields.category.optional(),
  stock: productFields.stock.optional(),
  suppliers: productFields.suppliers.optional(),
  price: productFields.price.optional(),
}).min(1);
