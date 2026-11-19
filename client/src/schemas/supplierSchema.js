import * as yup from 'yup';

const STATUSES = ['Active', 'Deactive'];

export { STATUSES };

export const supplierSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Supplier name must be at least 2 characters')
    .required('Supplier name is required'),
  address: yup.string().trim().required('Address is required'),
  suppliers: yup.string().trim().required('Company is required'),
  date: yup.mixed().required('Delivery date is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .min(0, 'Amount cannot be negative')
    .required('Amount is required'),
  status: yup.string().oneOf(STATUSES, 'Invalid status').required('Status is required'),
});
