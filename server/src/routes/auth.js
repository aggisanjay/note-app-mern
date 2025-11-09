import { Router } from 'express';
import User from '../models/User.js';
import { signJwt, verifyJwt } from '../utils/jwt.js';

const r = Router();
const cookieName = process.env.COOKIE_NAME || 'token';
const cookieOpts = { httpOnly: true, sameSite: 'lax', secure: false };

r.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  const token = signJwt({ id: user._id }, process.env.JWT_SECRET);
  res.cookie(cookieName, token, cookieOpts).json({ id: user._id, name: user.name, email: user.email });
});

r.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.compare(password))) return res.status(400).json({ message: 'Invalid credentials' });

  const token = signJwt({ id: user._id }, process.env.JWT_SECRET);
  res.cookie(cookieName, token, cookieOpts).json({ id: user._id, name: user.name, email: user.email });
});

r.post('/logout', (req, res) => {
  res.clearCookie(cookieName).json({ ok: true });
});

r.get('/me', async (req, res) => {
  try {
    const token = req.cookies?.[cookieName];
    if (!token) return res.sendStatus(401);

    const decoded = verifyJwt(token, process.env.JWT_SECRET);
    if (!decoded?.id) return res.sendStatus(401);

    const user = await User.findById(decoded.id).select('name email');
    if (!user) return res.sendStatus(401);

    res.json({ id: user._id, name: user.name, email: user.email });
  } catch {
    return res.sendStatus(401);
  }
});

export default r;
