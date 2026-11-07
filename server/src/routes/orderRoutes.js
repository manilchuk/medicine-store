import { Router } from 'express';
import { getOrders } from '../controllers/orderController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, getOrders);

export default router;
