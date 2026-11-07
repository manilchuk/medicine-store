import { Router } from 'express';
import { getCustomers, getCustomerById } from '../controllers/customerController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, getCustomers);
router.get('/:customerId', auth, getCustomerById);

export default router;
