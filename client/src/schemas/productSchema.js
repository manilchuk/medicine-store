import * as yup from 'yup';

const CATEGORIES = [
  'Medicine',
  'Head',
  'Hand',
  'Dental Care',
  'Skin Care',
  'Eye Care',
  'Vitamins & Supplements',
  'Orthopedic Products',
  'Baby Care',
];

export { CATEGORIES };

export const productSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Product name must be at least 2 characters')
    .required('Product name is required'),
  category: yup.string().oneOf(CATEGORIES, 'Invalid category').required('Category is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  suppliers: yup.string().trim().min(2, 'Suppliers is required').required('Suppliers is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .min(0, 'Price cannot be negative')
    .required('Price is required'),
});
