import { verifyToken } from '../utils/jwt.js';

export function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized: missing token' });
  }

  const token = header.slice(7);

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized: invalid token' });
  }
}
