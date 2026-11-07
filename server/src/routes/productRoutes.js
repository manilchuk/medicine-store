import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { validate } from '../middleware/validate.js';
import { createProductSchema, updateProductSchema } from '../schemas/productSchemas.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, getProducts);
router.post('/', auth, validate(createProductSchema), createProduct);
router.put('/:productId', auth, validate(updateProductSchema), updateProduct);
router.delete('/:productId', auth, deleteProduct);

export default router;
