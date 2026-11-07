import { Router } from 'express';
import { getSuppliers, createSupplier, updateSupplier } from '../controllers/supplierController.js';
import { validate } from '../middleware/validate.js';
import { createSupplierSchema, updateSupplierSchema } from '../schemas/supplierSchemas.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, getSuppliers);
router.post('/', auth, validate(createSupplierSchema), createSupplier);
router.put('/:supplierId', auth, validate(updateSupplierSchema), updateSupplier);

export default router;
