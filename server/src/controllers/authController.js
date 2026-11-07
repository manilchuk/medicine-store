import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken({ id: user._id.toString(), email: user.email });

    res.status(200).json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res) {
  // JWT stateless — клієнт видаляє токен.
  // Ендпоінт існує для сумісності з ТЗ і для майбутнього blacklist.
  res.status(204).end();
}

export async function getUserInfo(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
}
