import { verifyJwt } from '../utils/jwt.js';
import User from '../models/User.js';

const cookieName = process.env.COOKIE_NAME || "token";

export async function requireAuth(req, res, next) {
  const token = req.cookies?.[cookieName];
  if (!token) return res.sendStatus(401);

  const decoded = verifyJwt(token, process.env.JWT_SECRET);
  if (!decoded?.id) return res.sendStatus(401);

  const user = await User.findById(decoded.id).select("_id name email");
  if (!user) return res.sendStatus(401);

  req.user = {
    id: user._id.toString(),
    name: user.name,
    email: user.email
  };
  next();
}
