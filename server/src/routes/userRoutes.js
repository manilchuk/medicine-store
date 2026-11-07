import { Router } from 'express';
import { login, logout, getUserInfo } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../schemas/authSchemas.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.get('/logout', auth, logout);
router.get('/user-info', auth, getUserInfo);

export default router;
